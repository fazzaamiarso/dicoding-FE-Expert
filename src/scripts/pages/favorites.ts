/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { initialState, Task } from "@lit-labs/task";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "../../styles/reset";
import { utilClasses } from "../../styles/utils";
import { Restaurant } from "../api";
import { favoriteRestaurantDB } from "../lib/favorite-restaurant-idb";

@customElement("favorites-page")
export default class FavoritesPage extends LitElement {
  static styles = [resetStyles, utilClasses, css``];

  private _apiTask = new Task<any[], Restaurant[]>(
    this,
    async () => {
      try {
        const restaurants = await favoriteRestaurantDB.getAll();
        return restaurants.length ? restaurants : initialState;
      } catch (e) {
        throw Error("Godamn!");
      }
    },
    () => []
  );

  render() {
    return html`
      <div class="favorite layout">
        <h2 class="favorite__title">Favorite Restaurants</h2>
        <ul class="favorite__list">
          ${this._apiTask.render({
            initial: () => html`<p>Nothing to see here!</p>`,
            complete: (restaurants) =>
              restaurants.map(
                (restaurant) => html`<restaurant-card .restaurant=${restaurant}></restaurant-card>`
              ),
          })}
        </ul>
      </div>
    `;
  }
}
