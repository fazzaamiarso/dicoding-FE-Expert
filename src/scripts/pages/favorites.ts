/* eslint-disable import/extensions */
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("favorites-page")
export default class FavoritesPage extends LitElement {
  render() {
    return html`
      <div class="favorite">
        <h2>Favorite Restaurants</h2>
      </div>
    `;
  }
}
