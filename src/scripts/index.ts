import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "../components";
import "./pages";
import type MenuDrawer from "../components/menu-drawer";
import HashRouter from "./routes";

const router = new HashRouter({
  routes: [
    { path: "/", component: "home-page" },
    { path: "/favorites", component: "favorites-page" },
    { path: "/restaurants/:id", component: "detail-page" },
  ],
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