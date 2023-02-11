import "regenerator-runtime"; /* for async await transpile */
import "@/styles/main.scss";
import "@/components";
import "@/pages";
import HistoryRouter from "./router";
import { registerSW } from "./utils/sw/register-sw";
import type { MenuDrawer } from "@/components";

const router = new HistoryRouter({
  outlet: document.querySelector("main") as HTMLElement,
});

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/favorites", component: "favorites-page" },
  { path: "/restaurants/:id", component: "detail-page" },
]);

const drawer = document.querySelector("menu-drawer") as MenuDrawer;
drawer.triggerElement = document.querySelector("#menu-button") as HTMLElement;

registerSW();

