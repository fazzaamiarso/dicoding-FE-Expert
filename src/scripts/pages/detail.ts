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
import HashRouter, { RouteLocation } from "../router";

const heartSVG = () => html`<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-6 h-6"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
  />
</svg>`;

const heartFilledSVG = () => html`<svg
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  class="w-6 h-6"
>
  <path
    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
  />
</svg> `;

const starSVG = () => html`
  <svg
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
`;

const arrowLongLeftSVG = () => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-6 h-6"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
      clip-rule="evenodd"
    />
  </svg>
`;

const menuItemTemplate = ({ name }: { name: string }) => html`
  <li class="detail__menu-item">
    <img src="https://via.placeholder.com/50" alt=${name} />
    <div>${name}</div>
  </li>
`;

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles: CSSResultGroup = [
    resetStyles,
    utilClasses,
    css`
      .detail {
        --bg-header: rgba(199 210 254 / 0.25);
        display: grid;
        gap: 2rem;
        overflow: hidden;
      }
      .detail__action {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
      }
      .detail__back {
        border: none;
        background-color: var(--bg-header);
        border-radius: var(--rounded-md);
        padding: 0.5rem;
      }
      .detail__back svg {
        color: var(--text-indigo-100);
        width: 25px;
      }
      .detail__favorite {
        margin-left: auto;
        border: none;
        background-color: var(--bg-header);
        border-radius: var(--rounded-md);
        padding: 0.5rem;
      }
      .detail__favorite svg {
        width: 25px;
        color: red;
      }
      .detail__overlay {
        position: absolute;
        z-index: 5;
        inset: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to top, rgb(19, 19, 21), transparent);
      }
      .detail__img {
        --blur-value: 8px;
        --grayscale-value: 0.65;
        position: relative;
        min-height: 300px;
        width: 100%;
        filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
        -webkit-filter: blur(var(--blur-value)) grayscale(var(--grayscale-value));
      }
      .detail__header {
        position: relative;
        max-height: 420px;
        overflow: hidden;
        width: 100%;
      }
      .detail__header--inner {
        position: absolute;
        bottom: 0;
        z-index: 10;
        width: 100%;
      }
      .detail__header--content {
        display: grid;
        gap: 0.25rem;
        position: relative;
        padding-block: 1.5rem;
      }
      @media screen and (min-width: 640px) {
        .detail__name {
          font-size: 2.5rem;
        }
      }
      .detail__rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .detail__rating svg {
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
      .detail__category-item {
        font-size: var(--text-sm);
        background-color: var(--bg-header);
        padding: 0.35rem;
        border-radius: var(--rounded-md);
      }
      .detail__content {
        display: grid;
        gap: 2rem;
      }
      .detail__desc {
        max-width: 65ch;
      }
      .detail__menu {
        display: grid;
        gap: 2.25rem;
      }
      .detail__menu-header {
        margin-bottom: 1rem;
      }
      .detail__menu-list {
        display: grid;
        gap: 1.25rem;
        grid-template-columns: repeat(var(--column-size, 1), minmax(0, 1fr));
      }
      @media screen and (min-width: 640px) {
        .detail__menu-list {
          --column-size: 2;
        }
      }
      @media screen and (min-width: 1024px) {
        .detail__menu-list {
          --column-size: 3;
        }
      }
      .detail__menu-item {
        width: 100%;
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

  private async _submitHandler(e: SubmitEvent) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("review"));
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
                <div class="detail__header--content layout">
                  <div class="detail__action">
                    <button type="button" class="detail__back" @click="${HashRouter.back}">
                      ${arrowLongLeftSVG()}
                      <span class="sr-only">Go back</span>
                    </button>
                    <button
                      type="button"
                      class="detail__favorite"
                      @click="${() => this._toggleFavorite(restaurant)}"
                    >
                      ${this._isFavorited ? heartFilledSVG() : heartSVG()}
                      <span class="sr-only"
                        >${this._isFavorited ? "Remove from favorite" : "Add to favorite"}</span
                      >
                    </button>
                  </div>
                  <p>${restaurant.address}, ${restaurant.city}</p>
                  <h2 class="detail__name">${restaurant.name}</h2>
                  <ul class="detail__category">
                    ${restaurant.categories.map(
                      (category) => html`<li class="detail__category-item">${category.name}</li> `
                    )}
                  </ul>
                  <div>
                    <span class="detail__rating">
                      ${starSVG()} ${restaurant.rating} (${restaurant.customerReviews.length})</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="detail__content layout">
              <p class="detail__desc">${restaurant.description}</p>
              <div class="detail__menu">
                <div>
                  <h3 class="detail__menu-header">Foods</h3>
                  <ul class="detail__menu-list">
                    ${restaurant.menus.foods.map(menuItemTemplate)}
                  </ul>
                </div>
                <div>
                  <h3 class="detail__menu-header">Drinks</h3>
                  <ul class="detail__menu-list">
                    ${restaurant.menus.drinks.map(menuItemTemplate)}
                  </ul>
                </div>
              </div>
              <div class="review">
                <h3>Customer Reviews</h3>
                <form @submit="${this._submitHandler}">
                  <label for="customer-review">Add a review</label>
                  <textarea
                    id="customer-review"
                    name="review"
                    placeholder="What are your thoughts about this restaurant?"
                  ></textarea>
                  <button>Submit</button>
                </form>
                <ul class="review__list">
                  ${restaurant.customerReviews.map(
                    (review) => html`<li>
                      <h4>${review.name}</h4>
                      <p>${review.review}</p>
                    </li>`
                  )}
                </ul>
              </div>
            </div>
          `,
        })}
      </div>
    `;
  }
}
