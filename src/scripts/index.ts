import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "../components";
import type MenuDrawer from "../components/menu-drawer";
import HashRouter from "./routes";
import HomePage from "./page/home";
import Favorites from "./page/favorites";

const router = new HashRouter({
  routes: { "/": HomePage, "/favorites": Favorites },
  root: document.querySelector("main"),
});

window.addEventListener("hashchange", () => {
  const hashPath = window.location.hash;
  router.render(hashPath);
});

window.addEventListener("DOMContentLoaded", () => {
  const hashPath = window.location.hash;
  router.render(hashPath);

  const drawer = document.querySelector("#menu-drawer") as MenuDrawer;
  const menuButton = document.querySelector("#menu-button") as HTMLButtonElement;

  menuButton.addEventListener("click", () => {
    drawer.open = "true";
    drawer.dataset.triggerId = menuButton.id;
  });
});