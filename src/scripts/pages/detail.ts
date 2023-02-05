/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import { Task } from "@lit-labs/task";
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { arrowLongLeftSVG, heartFilledSVG, heartSVG, starSVG } from "../../assets/lit-svg";
import { resetStyles } from "../../styles/reset";
import { utilClasses } from "../../styles/utils";
import RestaurantAPI, { Restaurant, RestaurantWithDetail } from "../api";
import { favoriteRestaurantDB } from "../lib/favorite-restaurant-idb";
import HashRouter, { RouteLocation } from "../router";

const months: [string, number][] = Array.from(
  [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ],
  (v, k) => [v, k]
);

const d = new Map(months);

const parseDateFromLocale = (dateString: string) => {
  const splittedDate = dateString.split(" ");
  const monthGetter = splittedDate[1].toLowerCase();
  const month = d.get(monthGetter) + 1;
  const year = splittedDate[2];
  const day = splittedDate[0];
  return `${year}/${month}/${day}`;
};

const menuItemTemplate = ({ name }: { name: string }) => html`
  <li class="detail__menu-item">
    <img src="https://via.placeholder.com/50" alt=${name} />
    <div>${name}</div>
  </li>
`;

const reviewItemTemplate = ({
  name,
  content,
  publishedAt,
}: {
  name: string;
  content: string;
  publishedAt: string;
}) => {
  // const relativeFormatter = new Intl.RelativeTimeFormat("en-US", { style: "narrow" });
  const avatarUrl = `https://api.dicebear.com/5.x/avataaars-neutral/svg?seed=${name}`;
  return html`<li class="review__item">
    <img src=${avatarUrl} alt="" class="review__avatar" />
    <div class="review__content">
      <h4 class="review__reviewer">${name}</h4>
      <p class="review__date">${parseDateFromLocale(publishedAt)}</p>
      <p class="review__content">${content}</p>
    </div>
  </li>`;
};

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

      .review {
        display: grid;
        gap: 2rem;
        max-width: 600px;
      }
      .review__form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .review__textarea {
        resize: vertical;
      }

      .review__list {
        display: grid;
        gap: 1.1rem;
      }
      .review__item {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        padding: 1.25rem;
        background-color: #141e2f;
      }
      .review__reviewer {
      }
      .review__content {
      }
      .review__date {
        font-size: var(--text-sm);
      }
      .review__avatar {
        padding-top: 0.5rem;
        width: 40px;
        border-radius: var(--rounded-sm);
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
                <h3 class="review__title">Customer Reviews</h3>
                <form @submit="${this._submitHandler}" class="review__form">
                  <label for="customer-review">Add a review</label>
                  <textarea
                    class="review__textarea"
                    id="customer-review"
                    name="review"
                    rows="${3}"
                    placeholder="What are your thoughts about this restaurant?"
                  ></textarea>
                  <button class="review__submit">Submit</button>
                </form>
                <ul class="review__list">
                  ${restaurant.customerReviews.map((review) =>
                    reviewItemTemplate({
                      name: review.name,
                      content: review.review,
                      publishedAt: review.date,
                    })
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

