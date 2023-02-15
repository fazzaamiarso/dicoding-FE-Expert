import { Task } from "@lit-labs/task";
import { CSSResultGroup, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { arrowLongLeftSVG, heartFilledSVG, heartSVG, starSVG } from "@/assets/lit-svg";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";
import HistoryRouter from "@/router";
import { Restaurant, RestaurantWithDetail } from "@/types/restaurant-api";
import { RouteLocation } from "@/types/router";
import RestaurantAPI from "@/lib/restaurant-api";
import { menuItemTemplate, reviewItemTemplate } from "./templates";
import { detailStyles } from "./styles";
import { featureSupportToast } from "@/lib/toast";
import { formatRatingDisplay } from "@/utils/format-rating";
import { commonStyles } from "@/styles/common";

const detailLoading = () => html`
  <div class="layout">
    <div class="loading__stack loading__stack--md">
      <div class="loading__block"></div>
      <div class="loading__block loading__block--title"></div>
      <div class="loading__block"></div>
    </div>
  </div>
`;

const reviewForm = ({ handleSubmit }: { handleSubmit: (e: SubmitEvent) => unknown }) => html`
  <form @submit="${handleSubmit}" class="review__form">
    <div class="review__input-container">
      <label for="customer-name" class="review__label">Name</label>
      <input
        id="customer-name"
        name="customer-name"
        type="text"
        class="review__input"
        autocomplete="off"
      />
    </div>
    <div class="review__input-container">
      <label for="customer-review" class="review__label">Write your review</label>
      <textarea
        class="review__input review__textarea"
        id="customer-review"
        name="customer-review"
        rows="${3}"
        placeholder="What are your thoughts about this restaurant?"
      ></textarea>
    </div>
    <button class="review__submit click-area">Submit</button>
  </form>
`;

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles: CSSResultGroup = [resetStyles, utilClasses, detailStyles, commonStyles];

  @property({ type: Object })
  location!: RouteLocation;

  @state() private _isFavorited = false;

  async firstUpdated() {
    this._isFavorited = await this._getFavorited(this.location.params.id);
  }

  private _apiTask = new Task<string[], RestaurantWithDetail>(this, {
    task: async ([restaurantId]) => RestaurantAPI.getById(restaurantId),
    args: () => [this.location.params.id],
  });

  private _checkIDBFavoriteSupport() {
    const isSupported = favoriteRestaurantDB.checkIsSupported();
    if (!isSupported) {
      featureSupportToast.showToast();
    }
    return isSupported;
  }

  private async _toggleFavorite(restaurant: Restaurant) {
    if (!this._checkIDBFavoriteSupport()) return;
    const isFavorited = await this._getFavorited(restaurant.id);
    if (!isFavorited) await favoriteRestaurantDB.insertSingle(restaurant);
    else await favoriteRestaurantDB.deleteSingle(restaurant.id);
    this._isFavorited = !isFavorited;
  }

  private async _getFavorited(restaurantId: string) {
    try {
      return Boolean(await favoriteRestaurantDB.getSingle(restaurantId));
    } catch {
      return false;
    }
  }

  private async _submitHandler(e: SubmitEvent) {
    e.preventDefault();
    if (!(e.currentTarget instanceof HTMLFormElement)) return;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("customer-name") as string;
    const review = formData.get("customer-review") as string;
    await RestaurantAPI.postSingleReview({ name, review, id: this.location.params.id });
    this._apiTask.run([this.location.params.id]);
  }

  render() {
    return html`
      <div id="detail" class="detail">
        ${this._apiTask.render({
          initial: () => detailLoading(),
          pending: () => detailLoading(),
          error: (e: any) => html`
            <div class="error__container">
              <h2 class="error__title">We're unable to get your request!</h2>
              <p class="error__message">${e?.message || "Something went wrong!"}</p>
            </div>
          `,
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
                  <div class="detail__actions">
                    <button
                      type="button"
                      class="click-area detail__action detail__action--back"
                      @click="${HistoryRouter.back}"
                    >
                      ${arrowLongLeftSVG()}
                      <span class="sr-only">Go back</span>
                    </button>
                    <button
                      type="button"
                      class="click-area detail__action detail__action--favorite"
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
                      ${starSVG()} ${formatRatingDisplay(restaurant.rating)}
                      (${restaurant.customerReviews.length})</span
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
                ${reviewForm({ handleSubmit: this._submitHandler })}
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
