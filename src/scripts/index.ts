import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.scss";
import "../components";
import "./pages";
import type MenuDrawer from "../components/menu-drawer";
import HashRouter from "./routes";

const router = new HashRouter({
  outlet: document.querySelector("main"),
});

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/favorites", component: "favorites-page" },
  { path: "/restaurants/:id", component: "detail-page" },
]);

window.addEventListener("DOMContentLoaded", async () => {
  const drawer = document.querySelector("#menu-drawer") as MenuDrawer;
  const menuButton = document.querySelector("#menu-button") as HTMLButtonElement;

  menuButton.addEventListener("click", () => {
    drawer.open = "true";
    drawer.dataset.triggerId = menuButton.id;
  });
});