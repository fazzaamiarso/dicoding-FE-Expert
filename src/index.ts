import "regenerator-runtime"; /* for async await transpile */
import "@/styles/main.scss";
import "@/styles/font.css";
import "@/components";
import "@/pages";
import HistoryRouter from "@/router/router";
import { registerSW } from "@/utils/sw/register-sw";

const router = new HistoryRouter({
  outlet: document.querySelector("main") as HTMLElement,
});

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/favorites", component: "favorites-page" },
  { path: "/restaurants/:id", component: "detail-page" },
]);
 
registerSW();

