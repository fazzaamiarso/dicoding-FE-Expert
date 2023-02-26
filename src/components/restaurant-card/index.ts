import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { carSVG, starSVG } from "@/assets/lit-svg";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { Restaurant } from "@/types/restaurant-api";
import RestaurantAPI from "@/lib/restaurant-api";
import { cardStyles } from "./styles";
import { formatRatingDisplay } from "@/utils/format-rating";

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
  static styles = [resetStyles, utilClasses, cardStyles];

  @property({ type: Object })
  public restaurant: Restaurant | undefined;

  @property({ type: Boolean })
  public loading = false;

  protected render() {
    if (this.loading || !this.restaurant) return catalogLoading();
    const rating = formatRatingDisplay(this.restaurant.rating);
    return html`
      <div class="catalog__card">
        <div class="catalog__section catalog__section--top">
          <div class="catalog__thumb">
            <lazy-image data-src=${RestaurantAPI.buildImageURL(
              this.restaurant.pictureId
            )} width="40"
              height="40"
              alt="${this.restaurant.name} restaurant"></lazy-image>
            <!-- <img
              src="${RestaurantAPI.buildImageURL(this.restaurant.pictureId)}"
              width="40"
              height="40"
              alt="${this.restaurant.name} restaurant"
              class="catalog__img"
              loading="lazy"
            /> -->
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

