/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import { css, CSSResultGroup, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import RestaurantAPI, { RestaurantWithDetail } from "../api";
import { RouteLocation } from "../routes";

@customElement("detail-page")
export default class DetailPage extends LitElement {
  static styles?: CSSResultGroup = css`
    .detail {
      width: 90%;
      margin-inline: auto;
      max-width: 1200px;
    }
  `;

  @property({ type: Object })
  location: RouteLocation;

  @property({ type: Object })
  restaurant: RestaurantWithDetail;

  async connectedCallback() {
    super.connectedCallback();
    const { params } = this.location;
    const response = await RestaurantAPI.getById(params.id);
    this.restaurant = response.data;
  }

  render() {
    if (!this.restaurant) return nothing;
    return html`
      <div id="detail" class="detail">
        <img src="${RestaurantAPI.buildImageURL(this.restaurant.pictureId)}" alt="" />
        <h2>${this.restaurant.name}</h2>
        <p>${this.restaurant.city}</p>
        <p>${this.restaurant.description}</p>
        <div>
          <h3>Customer Reviews</h3>
          <ul>
            ${this.restaurant.customerReviews.map(
              (review) => html`<li>
                <h4>${review.name}</h4>
                <p>${review.review}</p>
              </li>`
            )}
          </ul>
        </div>
      </div>
    `;
  }
}
