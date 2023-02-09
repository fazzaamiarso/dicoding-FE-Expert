import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { carSVG, starSVG } from "@/assets/lit-svg";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { Restaurant } from "@/types/restaurant-api";
import RestaurantAPI from "@/lib/restaurant-api";

const newStyle = css`
  .catalog__card {
    position: relative;
    max-width: 450px;
    border-radius: var(--rounded-md);
    background-color: #0f141d;
    border: solid 2px transparent;
    transition: all 300ms ease-in-out;
  }
  .catalog__card:is(:focus-within, :hover) {
    border-color: var(--text-indigo-600);
  }
  .catalog__section {
    padding: 1rem;
  }
  .catalog__section.catalog__section--top {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 0.1px var(--text-indigo-900) solid;
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
    color: var(--text-indigo-100);
    width: 16px;
  }
  .catalog__link {
    background-color: var(--text-indigo-800);
    text-decoration: none;
    color: var(--text-indigo-100);
    margin-left: auto;
  }
  .catalog__link::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 5;
  }
`;

@customElement("restaurant-card")
export default class RestaurantCard extends LitElement {
  static styles = [resetStyles, utilClasses, newStyle];

  @property()
  public restaurant: Restaurant;

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
          <a href="/restaurants/${this.restaurant.id}" class="catalog__link"></a>
        </div>
      </li>
    `;
  }
}
