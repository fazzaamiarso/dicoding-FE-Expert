import MenuDrawer from "./menu-drawer";
import RestaurantCard from "./restaurant-card";

export { MenuDrawer, RestaurantCard };

declare global {
  interface HTMLElementTagNameMap {
    "restaurant-card": RestaurantCard;
    "menu-drawer": MenuDrawer;
  }
}
