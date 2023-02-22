import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";
import { utilClasses } from "@/styles/utils";
import { tripleLineSVG } from "@/assets/lit-svg";
import { navbarStyles } from "./styles";

@customElement("nav-bar")
export default class NavBar extends LitElement {
  static styles = [resetStyles, utilClasses, navbarStyles];

  firstUpdated() {
    const drawer = this.renderRoot.querySelector("menu-drawer")!;
    drawer.triggerElement = this.renderRoot.querySelector("#menu-button") as HTMLElement;
  }

  protected render() {
    return html` <header class="navbar layout">
      <picture>
        <source type="image/webp" srcset="images/logo.webp" />
        <source type="image/jpeg" srcset="images/logo.jpg" />
        <img src="images/logo.jpg" alt="" width="50" />
      </picture>
      <h1 class="navbar__title sr-only">Food Hunt</h1>
      <nav class="navbar__nav">
        <ul class="navbar__list">
          <li class="navbar__item"><a class="navbar__link click-area" href="/">Home</a></li>
          <li class="navbar__item">
            <a class="navbar__link click-area" href="/favorites">Favorite</a>
          </li>
          <li class="navbar__item">
            <a
              class="navbar__link click-area"
              href="https://www.fazzaamiarso.me"
              target="_blank"
              rel="noopener noreferrer"
              >About Us</a
            >
          </li>
        </ul>
      </nav>
      <button type="button" id="menu-button" class="navbar__menu-button click-area">
        <span class="sr-only">Open menu button</span>
        ${tripleLineSVG()}
      </button>
      <menu-drawer id="menu-drawer"></menu-drawer>
    </header>`;
  }
}
