import { css, html, LitElement } from "lit";
// eslint-disable-next-line import/extensions
import { customElement, property } from "lit/decorators.js";
import type { Restaurant } from "../../scripts/api";
import RestaurantAPI from "../../scripts/api";

@customElement("restaurant-card")
export default class RestaurantCard extends LitElement {
  static styles = css`
    .catalog__card {
      max-width: 500px;
    }
    .catalog__star {
      width: 18px;
    }
    .catalog__thumb {
      position: relative;
      height: 8rem;
      overflow: hidden;
      width: 100%;
    }
    .catalog__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `;

  @property()
  public restaurant: Restaurant;

  protected render() {
    const rating = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(
      this.restaurant.rating
    );
    return html`
      <li class="catalog__card">
        <div class="catalog__thumb">
          <img
            src="${RestaurantAPI.buildImageURL(this.restaurant.pictureId)}"
            alt="${this.restaurant.name} restaurant"
            class="catalog__img"
          />
          <div class="catalog__overlay"></div>
        </div>
        <div class="catalog__content">
          <h3 class="catalog__title">${this.restaurant.name}</h3>
          <div class="catalog__detail">
            <span class="catalog__rating">
              <svg
                class="catalog__star"
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
              ${rating}
            </span>
            -
            <span>${this.restaurant.city}</span>
          </div>
          <a href="#/restaurants/${this.restaurant.id}">See detail</a>
        </div>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "restaurant-card": RestaurantCard;
  }
}
