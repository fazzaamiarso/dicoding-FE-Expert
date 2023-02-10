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
    color: #65dca2;
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

  .loading__catalog {
    padding: 1rem;
    width: 100%;
    min-height: 100px;
    background-color: #0f141d;
  }

  .loading__content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .loading__stack {
    width: 100%;
  }
  .loading__block {
    position: relative;
    background-color: darkgray;
    border-radius: var(--rounded-sm);
    width: var(--block-w, 100%);
    height: var(--block-h, 20px);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .loading__block.loading__block--img {
    --block-w: 60px;
    --block-h: 60px;
  }
  .loading__block.loading__block--title {
    --block-h: 30px;
    --block-w: 100%;
    margin-bottom: 0.5rem;
  }
  .loading__block.loading__block--text {
    --block-h: 10px;
    --block-w: 80%;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const catalogLoading = () => html`<div class="loading__catalog">
  <div class="loading__content">
    <div class="loading__block loading__block--img"></div>
    <div class="loading__stack">
      <div class="loading__block loading__block--title"></div>
      <div class="loading__block loading__block--text"></div>
    </div>
  </div>
  <div class="loading__block"></div>
</div> `;

@customElement("restaurant-card")
export default class RestaurantCard extends LitElement {
  static styles = [resetStyles, utilClasses, newStyle];

  @property({ type: Object })
  public restaurant: Restaurant;

  @property({ type: Boolean })
  public loading = false;

  private _formatRating(rating: number) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(rating);
  }

  protected render() {
    if (this.loading) return catalogLoading();
    const rating = this._formatRating(this.restaurant.rating);
    return html`
      <div class="catalog__card">
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
          <a href="/restaurants/${
            this.restaurant.id
          }" class="catalog__link"><span class="sr-only">see ${
      this.restaurant.name
    } detail</span></a>
        </div>
      </div>
    `;
  }
}
