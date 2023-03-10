import FavoriteButton from "./favorite-button";
import FooterBar from "./footer-bar";
import LazyImage from "./lazy-image";
import MenuDrawer from "./menu-drawer";
import NavBar from "./nav-bar";
import RestaurantCard from "./restaurant-card";

export { MenuDrawer, RestaurantCard, NavBar, FooterBar, FavoriteButton, LazyImage };

declare global {
  interface HTMLElementTagNameMap {
    "restaurant-card": RestaurantCard;
    "menu-drawer": MenuDrawer;
    "nav-bar": NavBar;
    "footer-bar": FooterBar;
    "favorite-button": FavoriteButton;
    "lazy-image": LazyImage;
  }
}
