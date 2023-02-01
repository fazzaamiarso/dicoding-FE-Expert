/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import { Task } from "@lit-labs/task";
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import RestaurantAPI, { RestaurantWithDetail } from "../api";
import { RouteLocation } from "../router";

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles?: CSSResultGroup = css`
    .detail {
      width: 90%;
      margin-inline: auto;
      max-width: 1200px;
    }
  `;

  // INVESTIGATE IF THIS CAUSE WARNING
  @property({ type: Object })
  location: RouteLocation;

  private _apiTask = new Task<[string], RestaurantWithDetail>(
    this,
    async ([restaurantId]) => RestaurantAPI.getById(restaurantId),
    () => [this.location.params.id]
  );

  render() {
    return this._apiTask.render({
      initial: () => html`${nothing}`,
      pending: () => html`<p>Loading Details</p>`,
      complete: (restaurant) => html`<div id="detail" class="detail">
        <img src="${RestaurantAPI.buildImageURL(restaurant.pictureId)}" alt="" />
        <h2>${restaurant.name}</h2>
        <p>${restaurant.city}</p>
        <p>${restaurant.description}</p>
        <div>
          <h3>Customer Reviews</h3>
          <ul>
            ${restaurant.customerReviews.map(
              (review) => html`<li>
                <h4>${review.name}</h4>
                <p>${review.review}</p>
              </li>`
            )}
          </ul>
        </div>
      </div>`,
    });
  }
}
