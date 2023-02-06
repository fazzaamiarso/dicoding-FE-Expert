import { Task } from "@lit-labs/task";
import { CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { arrowLongLeftSVG, heartFilledSVG, heartSVG, starSVG } from "@/assets/lit-svg";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";
import HashRouter from "@/router";
import { Restaurant, RestaurantWithDetail } from "@/types/restaurant-api";
import { RouteLocation } from "@/types/router";
import RestaurantAPI from "@/lib/restaurant-api";
import { menuItemTemplate, reviewItemTemplate } from "./templates";
import { detailStyles } from "./styles";

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles: CSSResultGroup = [resetStyles, utilClasses, detailStyles];

  // INVESTIGATE IF THIS CAUSE WARNING
  @property({ type: Object })
  location: RouteLocation;

  @state() private _isFavorited = false;

  async willUpdate() {
    this._isFavorited = await this._getFavorited(this.location.params.id);
  }

  private _apiTask = new Task<[string], RestaurantWithDetail>(
    this,
    async ([restaurantId]) => RestaurantAPI.getById(restaurantId),
    () => [this.location.params.id]
  );

  private async _toggleFavorite(restaurant: Restaurant) {
    const isFavorited = await this._getFavorited(restaurant.id);
    if (!isFavorited) await favoriteRestaurantDB.insertSingle(restaurant);
    else await favoriteRestaurantDB.deleteSingle(restaurant.id);
    this.requestUpdate();
  }

  private async _getFavorited(restaurantId: string) {
    const isFavorited = Boolean(await favoriteRestaurantDB.getSingle(restaurantId));
    return isFavorited;
  }

  // TODO: imlement input validation and sanitazion
  private async _submitHandler(e: SubmitEvent) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("customer-name") as string;
    const review = formData.get("customer-review") as string;
    await RestaurantAPI.postSingleReview({ name, review, id: this.location.params.id });
  }

  render() {
    return html`
      <div id="detail" class="detail">
        ${this._apiTask.render({
          initial: () => html`${nothing}`,
          pending: () => html`<p>Loading Details</p>`,
          complete: (restaurant) => html`
            <div class="detail__header">
              <div class="detail__thumb">
                <img
                  class="detail__img"
                  src="${RestaurantAPI.buildImageURL(restaurant.pictureId, { size: "large" })}"
                  alt=""
                />
                <div class="detail__overlay"></div>
              </div>
              <div class="detail__header--inner">
                <div class="detail__header--content layout">
                  <div class="detail__action">
                    <button type="button" class="detail__back" @click="${HashRouter.back}">
                      ${arrowLongLeftSVG()}
                      <span class="sr-only">Go back</span>
                    </button>
                    <button
                      type="button"
                      class="detail__favorite"
                      @click="${() => this._toggleFavorite(restaurant)}"
                    >
                      ${this._isFavorited ? heartFilledSVG() : heartSVG()}
                      <span class="sr-only"
                        >${this._isFavorited ? "Remove from favorite" : "Add to favorite"}</span
                      >
                    </button>
                  </div>
                  <p>${restaurant.address}, ${restaurant.city}</p>
                  <h2 class="detail__name">${restaurant.name}</h2>
                  <ul class="detail__category">
                    ${restaurant.categories.map(
                      (category) => html`<li class="detail__category-item">${category.name}</li> `
                    )}
                  </ul>
                  <div>
                    <span class="detail__rating">
                      ${starSVG()} ${restaurant.rating} (${restaurant.customerReviews.length})</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="detail__content layout">
              <p class="detail__desc">${restaurant.description}</p>
              <div class="detail__menu">
                <div>
                  <h3 class="detail__menu-header">Foods</h3>
                  <ul class="detail__menu-list">
                    ${restaurant.menus.foods.map(menuItemTemplate)}
                  </ul>
                </div>
                <div>
                  <h3 class="detail__menu-header">Drinks</h3>
                  <ul class="detail__menu-list">
                    ${restaurant.menus.drinks.map(menuItemTemplate)}
                  </ul>
                </div>
              </div>
              <div class="review">
                <h3 class="review__title">Customer Reviews</h3>
                <form @submit="${this._submitHandler}" class="review__form">
                  <div class="review__input-container">
                    <label for="customer-name">Name</label>
                    <input id="customer-name" name="customer-name" type="text" />
                  </div>
                  <div class="review__input-container">
                    <label for="customer-review">Write your review</label>
                    <textarea
                      class="review__textarea"
                      id="customer-review"
                      name="customer-review"
                      rows="${0}"
                      placeholder="What are your thoughts about this restaurant?"
                    ></textarea>
                  </div>
                  <button class="review__submit">Submit</button>
                </form>
                <ul class="review__list">
                  ${restaurant.customerReviews.map((review) =>
                    reviewItemTemplate({
                      name: review.name,
                      content: review.review,
                      publishedAt: review.date,
                    })
                  )}
                </ul>
              </div>
            </div>
          `,
        })}
      </div>
    `;
  }
}
