/* eslint-disable no-underscore-dangle */
import { css, html, LitElement } from "lit";
// eslint-disable-next-line import/extensions
import { customElement, property } from "lit/decorators.js";
import { starSVG } from "../../assets/lit-svg";
import type { Restaurant } from "../../scripts/api";
import RestaurantAPI from "../../scripts/api";
import { resetStyles } from "../../styles/reset";
import { utilClasses } from "../../styles/utils";

const newStyle = css`
  .catalog__card {
    max-width: 450px;
    border-radius: var(--rounded-md);
    background-color: #0f141d;
  }
  .catalog__section {
    padding: 1rem;
  }

  .catalog__section.catalog__section--top {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 0.25px darkgray solid;
  }

  .catalog__section.catalog__section--bottom {
    padding: 0.75rem;
    display: flex;
    width: 100%;
    gap: 2rem;

    font-size: var(--text-sm);
  }

  .catalog__thumb {
    width: 40px;
    height: 40px;
  }
  .catalog__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--rounded-md);
  }
  .catalog__title {
    color: var(--text-indigo-400);
    font-size: 1rem;
  }
  .catalog__city {
    font-size: var(--text-sm);
  }
  .catalog__rating {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .catalog__rating svg {
    fill: #facd15;
    width: 16px;
  }
  .catalog__parking {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .catalog__parking svg {
    color: #facd15;
    width: 16px;
  }
  .catalog__link {
    background-color: var(--text-indigo-800);
    text-decoration: none;
    color: var(--text-indigo-100);
    margin-left: auto;
  }
`;

const carSVG = () => html`
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fill="currentColor"
      d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM7.5 16c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zM5.81 10l1.04-3h10.29l1.04 3H5.81z"
    />
  </svg>
`;

@customElement("restaurant-card")
export default class RestaurantCard extends LitElement {
  static styles = [resetStyles, utilClasses, newStyle];

  @property()
  public restaurant: Restaurant;

  // eslint-disable-next-line class-methods-use-this
  private _formatRating(rating: number) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(rating);
  }

  protected render() {
    const rating = this._formatRating(this.restaurant.rating);
    return html`
      <li class="catalog__card">
        <div class="catalog__section catalog__section--top">
          <div class="catalog__thumb">
            <img
              src="${RestaurantAPI.buildImageURL(this.restaurant.pictureId)}"
              alt="${this.restaurant.name} restaurant"
              class="catalog__img"
            />
          </div>
          <div class="catalog__content">
            <h3 class="catalog__title">${this.restaurant.name}</h3>
            <p class="catalog__city">${this.restaurant.city}</p>
          </div>
        </div>
        <div class="catalog__section catalog__section--bottom">
          <div class="catalog__rating">
              ${starSVG()}
              ${rating}
            </span>
          </div>
          <div class="catalog__parking">
              ${carSVG()}
              Free
            </span>
          </div>
          <a href="#/restaurants/${this.restaurant.id}" class="catalog__link">See detail</a>
        </div>
      </li>
    `;
  }
}
