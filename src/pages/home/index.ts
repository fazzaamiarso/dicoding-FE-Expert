import { Task } from "@lit-labs/task";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import RestaurantAPI from "@/lib/restaurant-api";
import { Restaurant } from "@/types/restaurant-api";
import { arrowDownSVG } from "@/assets/lit-svg";
import { homeStyles } from "./styles";

@customElement("home-page")
export default class HomePage extends LitElement {
  static styles = [resetStyles, utilClasses, homeStyles];

  private _apiTask = new Task<any[], Restaurant[]>(this, RestaurantAPI.getAll, () => []);

  render() {
    return html`
      <div class="hero">
        <div class="hero__overlay"></div>
        <img class="hero__img" src="images/heros/hero-image_2.jpg" alt="" />
        <div class="hero__content">
          <div class="hero__content--inner">
            <div class="hero__text">
              <h2 class="hero__header">Find Your Next Favourite Restaurants</h2>
              <p class="hero__desc">
                Our catalog is a curated list of restaurant from all over Indonesia
              </p>
            </div>
            <div class="hero__cta-group">
              <a href="#explore" class="hero__cta hero__cta--primary click-area"
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
                (restaurant) => html`<restaurant-card .restaurant=${restaurant}></restaurant-card>`
              ),
            initial: () => html`<p>Nothing to see!</p>`,
            pending: () => html`<p>I'm Loading Mann!</p>`,
          })}
        </ul>
      </div>
    `;
  }
}
