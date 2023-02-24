import { Task } from "@lit-labs/task";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import RestaurantAPI from "@/lib/restaurant-api";
import { Restaurant } from "@/types/restaurant-api";
import { arrowDownSVG } from "@/assets/lit-svg";
import { homeStyles } from "./styles";
import { commonStyles } from "@/styles/common";

@customElement("home-page")
export default class HomePage extends LitElement {
  static styles = [resetStyles, utilClasses, homeStyles, commonStyles];

  private _apiTask = new Task<any[], Restaurant[]>(this, RestaurantAPI.getAll, () => []);

  private _scrollIntoView(e: Event) {
    if (!(e.target instanceof HTMLAnchorElement)) return;
    this.renderRoot.querySelector(`${e.target.hash}`)?.scrollIntoView();
  }

  render() {
    return html`
      <div class="hero">
        <div class="hero__overlay"></div>
        <picture>
          <source
            media="(max-width: 500px)"
            type="image/webp"
            srcset="images/webp/hero-image_2-small.webp"
          />
          <source
            media="(max-width: 500px)"
            type="image/jpeg"
            srcset="images/jpg/hero-image_2-small.jpg"
          />
          <source type="image/webp" srcset="images/webp/hero-image_2.webp" />
          <source type="image/jpeg" srcset="images/jpg/hero-image_2.jpg" />
          <img
            src="images/heros/hero-image_2.jpg"
            type="image/jpeg"
            media="all"
            alt=""
            class="hero__img"
            fetchpriority="high"
          />
        </picture>
        <div class="hero__content">
          <div class="hero__content--inner">
            <div class="hero__text">
              <h2 class="hero__header">Find Your Next Favourite Restaurants</h2>
              <p class="hero__desc">
                Our catalog is a curated list of restaurant from all over Indonesia
              </p>
            </div>
            <div class="hero__cta-group">
              <a
                href="#explore"
                @click="${this._scrollIntoView}"
                class="hero__cta hero__cta--primary click-area"
                ><span>Explore Now </span>
                ${arrowDownSVG()}
              </a>
              <a href="#" class="hero__cta hero__cta--secondary click-area">Learn more</a>
            </div>
          </div>
        </div>
      </div>
      <div id="explore" class="catalog layout">
        <h2 class="catalog__header">Explore Restaurants</h2>
        <ul id="catalog-list" class="catalog__list">
          ${this._apiTask.render({
            complete: (restaurants) =>
              restaurants.map(
                (restaurant) => html`<li>
                  <restaurant-card .restaurant=${restaurant}></restaurant-card>
                </li>`
              ),
            initial: () =>
              [...Array(9).keys()].map(
                () => html`<restaurant-card ?loading=${true}></restaurant-card>`
              ),
            pending: () =>
              [...Array(9).keys()].map(
                () => html`<restaurant-card ?loading=${true}></restaurant-card>`
              ),
            error: (e: any) => html` <div class="error__container">
              <h3 class="error__title">We're unable to get your request!</h3>
              <p class="error__message">${e?.message || "Something went wrong!"}</p>
            </div>`,
          })}
        </ul>
      </div>
    `;
  }
}
