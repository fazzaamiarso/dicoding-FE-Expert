import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "../components";
import type MenuDrawer from "../components/menu-drawer";
import HashRouter from "./routes";
import HomePage from "./page/home";
import Favorites from "./page/favorites";
import Detail from "./page/detail";

// eslint-disable-next-line import/prefer-default-export
const router = new HashRouter({
  routes: { "/": HomePage, "/favorites": Favorites, "/restaurants/:id": Detail },
  root: document.querySelector("main"),
});

window.addEventListener("hashchange", async () => {
  const hashPath = window.location.hash;
  await router.render(hashPath);
});

window.addEventListener("DOMContentLoaded", async () => {
  const hashPath = window.location.hash;
  const drawer = document.querySelector("#menu-drawer") as MenuDrawer;
  const menuButton = document.querySelector("#menu-button") as HTMLButtonElement;

  menuButton.addEventListener("click", () => {
    drawer.open = "true";
    drawer.dataset.triggerId = menuButton.id;
  });

  await router.render(hashPath || "#/");
});