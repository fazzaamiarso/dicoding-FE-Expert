/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import { Task } from "@lit-labs/task";
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resetStyles } from "../../styles/reset";
import { utilClasses } from "../../styles/utils";
import RestaurantAPI, { Restaurant, RestaurantWithDetail } from "../api";
import { favoriteRestaurantDB } from "../lib/favorite-restaurant-idb";
import { RouteLocation } from "../router";

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles: CSSResultGroup = [
    resetStyles,
    utilClasses,
    css`
      .detail__action {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .detail__favorite {
        margin-left: auto;
      }
      .detail__overlay {
        position: absolute;
        z-index: 1;
        inset: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top, rgb(19, 19, 21), transparent);
      }
      .detail__img {
        --blur-value: 4px;
        --grayscale-value: 0.65;
        position: relative;
        filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
        -webkit-filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
      }
      .detail__header {
        position: relative;
        width: 100%;
      }
      .detail__header--inner {
        position: absolute;
        bottom: 0;
        z-index: 10;
        width: 100%;
      }
      .detail__rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .detail__star {
        fill: #facd15;
        width: 18px;
      }
      .detail__category {
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .review__list {
        padding: 0;
        list-style: none;
      }
    `,
  ];

  // INVESTIGATE IF THIS CAUSE WARNING
  @property({ type: Object })
  location: RouteLocation;

  @state() private _isFavorited = false;

  async willUpdate() {
    this._isFavorited = await this._getFavorited(this.location.params.id);
  }

  private _apiTask = new Task<[string], RestaurantWithDetail>(
    this,
    async ([restaurantId]) => RestaurantAPI.getById(restaurantId),
    () => [this.location.params.id]
  );

  private async _toggleFavorite(restaurant: Restaurant) {
    const isFavorited = await this._getFavorited(restaurant.id);
    if (!isFavorited) await favoriteRestaurantDB.insertSingle(restaurant);
    else await favoriteRestaurantDB.deleteSingle(restaurant.id);
    this.requestUpdate();
  }

  private async _getFavorited(restaurantId: string) {
    const isFavorited = Boolean(await favoriteRestaurantDB.getSingle(restaurantId));
    return isFavorited;
  }

  render() {
    return html`
      <div id="detail" class="detail">
        ${this._apiTask.render({
          initial: () => html`${nothing}`,
          pending: () => html`<p>Loading Details</p>`,
          complete: (restaurant) => html`
            <div class="detail__header">
              <div class="detail__thumb">
                <img
                  class="detail__img"
                  src="${RestaurantAPI.buildImageURL(restaurant.pictureId, { size: "large" })}"
                  alt=""
                />
                <div class="detail__overlay"></div>
              </div>
              <div class="detail__header--inner">
                <div class="detail__action">
                  <button
                    type="button"
                    class="detail__favorite"
                    @click="${() => this._toggleFavorite(restaurant)}"
                  >
                    ${this._isFavorited ? "Remove from favorite" : "Add to favorite"}
                  </button>
                </div>
                <p>${restaurant.address}, ${restaurant.city}</p>
                <h2>${restaurant.name}</h2>
                <ul class="detail__category">
                  ${restaurant.categories.map(
                    (category) => html`<li class="detail__category-item">${category.name}</li> `
                  )}
                </ul>
                <div>
                  <span class="detail__rating">
                    <svg
                      class="detail__star"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    ${restaurant.rating}
                  </span>
                </div>
              </div>
            </div>
            <p>${restaurant.description}</p>
            <div class="review">
              <h3>Customer Reviews</h3>
              <ul class="review__list">
                ${restaurant.customerReviews.map(
                  (review) => html`<li>
                    <h4>${review.name}</h4>
                    <p>${review.review}</p>
                  </li>`
                )}
              </ul>
            </div>
          `,
        })}
      </div>
    `;
  }
}
