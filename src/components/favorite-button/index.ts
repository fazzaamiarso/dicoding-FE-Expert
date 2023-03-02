import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { favoriteRestaurantDB } from "@/lib/favorite-restaurant-idb";
import { Restaurant } from "@/types/restaurant-api";
import { featureSupportToast } from "@/lib/toast";
import { heartFilledSVG, heartSVG } from "@/assets/lit-svg";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { favoriteStyles } from "./styles";

@customElement("favorite-button")
export default class FavoriteButton extends LitElement {
  static styles = [resetStyles, utilClasses, favoriteStyles];

  @state() private _isFavorited = false;

  @property() public restaurant: Restaurant | undefined;

  async firstUpdated() {
    this._isFavorited =
      this.restaurant !== undefined && (await this._getFavorited(this.restaurant.id));
  }

  private _checkIDBFavoriteSupport() {
    const isSupported = favoriteRestaurantDB.checkIsSupported();
    if (!isSupported) {
      featureSupportToast.showToast();
    }
    return isSupported;
  }

  private async _toggleFavorite() {
    if (!this._checkIDBFavoriteSupport() || !this.restaurant) return;
    const isFavorited = await this._getFavorited(this.restaurant.id);
    if (!this._isFavorited) {
      await favoriteRestaurantDB.insertSingle(this.restaurant);
    } else {
      await favoriteRestaurantDB.deleteSingle(this.restaurant.id);
    }
    this._isFavorited = !isFavorited;
  }

  private async _getFavorited(restaurantId: string) {
    try {
      return Boolean(await favoriteRestaurantDB.getSingle(restaurantId));
    } catch {
      return false;
    }
  }

  protected render() {
    return html`
      <button
        type="button"
        class="click-area detail__action detail__action--favorite"
        @click="${this._toggleFavorite}"
      >
        ${this._isFavorited ? heartFilledSVG() : heartSVG()}
        <span class="sr-only"
          >${this._isFavorited ? "Remove from favorite" : "Add to favorite"}</span
        >
      </button>
    `;
  }
}
