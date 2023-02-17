import { initialState, Task } from "@lit-labs/task";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";
import { Restaurant } from "@/types/restaurant-api";
import { favoriteStyles } from "./styles";
import { commonStyles } from "@/styles/common";

@customElement("favorites-page")
export default class FavoritesPage extends LitElement {
  static styles = [resetStyles, utilClasses, favoriteStyles, commonStyles];

  private _apiTask = new Task<any[], Restaurant[]>(
    this,
    async () => {
      try {
        const restaurants = await favoriteRestaurantDB.getAll();
        return restaurants && restaurants.length ? restaurants : initialState;
      } catch (e: unknown) {
        if (e instanceof Error) throw new Error(e.message);
        throw new Error("Something went wrong!");
      }
    },
    () => []
  );

  render() {
    return html`
      <div class="favorite layout">
        <h2 class="favorite__title">Favorite Restaurants</h2>
        ${this._apiTask.render({
          complete: (restaurants) => html`<ul class="favorite__list">
            ${restaurants.map(
              (restaurant) => html`<li>
                <restaurant-card .restaurant=${restaurant}></restaurant-card>
              </li>`
            )}
          </ul>`,
          pending: () => html`<ul class="favorite__list">
            ${[...Array(9).keys()].map(
              () => html`<restaurant-card ?loading=${true}></restaurant-card>`
            )}
          </ul>`,
          initial: () => html`
            <div class="favorite__empty">
              <h3 class="favorite__empty-title">Looks like you don't have any favorites yet!</h3>
              <p>Get Started by exploring our restaurant list</p>
              <a href="/" class="favorite__empty-cta click-area">See restaurants</a>
            </div>
          `,
          error: (e: any) => html`
            <div class="error__container">
              <h3 class="error__title">We're unable to get your request!</h3>
              <p class="error__message">${e?.message || "Something went wrong!"}</p>
            </div>
          `,
        })}
      </div>
    `;
  }
}
