import { initialState, Task } from "@lit-labs/task";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";
import { Restaurant } from "@/types/restaurant-api";

@customElement("favorites-page")
export default class FavoritesPage extends LitElement {
  static styles = [
    resetStyles,
    utilClasses,
    css`
      .favorite__list {
        --row-gap: 1.5rem;
        --column-gap: 1.75rem;
        width: 100%;
        display: grid;
        row-gap: var(--row-gap);
        column-gap: var(--column-gap);
      }
      .favorite__empty {
        width: 100%;
        padding-block: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
        text-align: center;
      }
      .favorite__empty-title {
        font-size: 2rem;
        color: var(--text-indigo-300);
      }
      .favorite__empty-cta {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0.7rem;
        font-weight: 600;
        color: black;
        background-color: #65dca2;
        border-radius: var(--rounded-sm);
        text-decoration: none;
      }
      @media screen and (min-width: 648px) {
        .favorite__list {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media screen and (min-width: 1024px) {
        .favorite__list {
          --column-gap: 1.5rem;
          --row-gap: 1.5rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    `,
  ];

  private _apiTask = new Task<any[], Restaurant[]>(
    this,
    async () => {
      try {
        const restaurants = await favoriteRestaurantDB.getAll();
        return restaurants && restaurants.length ? restaurants : initialState;
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
        })}
      </div>
    `;
  }
}
