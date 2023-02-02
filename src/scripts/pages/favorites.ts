/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { Task } from "@lit-labs/task";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Restaurant } from "../api";
import { favoriteRestaurantDB } from "../lib/favorite-restaurant-idb";

@customElement("favorites-page")
export default class FavoritesPage extends LitElement {
  private _apiTask = new Task<any[], Restaurant[]>(
    this,
    () => favoriteRestaurantDB.getAll(),
    () => []
  );

  render() {
    return html`
      <div class="favorite">
        <h2>Favorite Restaurants</h2>
        <ul>
          ${this._apiTask.render({
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
