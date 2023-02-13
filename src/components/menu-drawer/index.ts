import { html, LitElement } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { xMarkSVG } from "@/assets/lit-svg";
import { drawerStyles } from "./styles";

@customElement("menu-drawer")
class MenuDrawer extends LitElement {
  static styles = [drawerStyles];

  @queryAll("a:not([disabled]), button:not([disabled])")
  _focusableEls!: NodeListOf<HTMLElement>;

  private _firstFocusableEl!: HTMLElement;

  private _lastFocusableEl!: HTMLElement;

  @property() open: boolean = false;

  @property() triggerElement!: HTMLElement;

  protected render(): unknown {
    return html`
      <div
        id="overlay"
        class=${classMap({ menu__overlay: true, "is-open": this.open })}
        @click="${this._closeDrawer}"
      ></div>
      <div id="menu" class=${classMap({ menu: true, "is-open": this.open })}>
        <div class="menu__inner">
          <button
            type="button"
            id="close-menu"
            class="menu__close click-area"
            aria-label="close menu"
            @click="${this._closeDrawer}"
          >
            ${xMarkSVG()}
          </button>
          <nav class="menu__nav">
            <ul class="menu__list">
              <li class="menu__item"><a class="menu__link click-area" href="/">Home</a></li>
              <li class="menu__item">
                <a class="menu__link click-area" href="/favorites">Favorite</a>
              </li>
              <li class="menu__item">
                <a
                  class="menu__link click-area"
                  href="https://www.fazzaamiarso.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  >About Us</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    `;
  }

  protected firstUpdated() {
    this.setAllTabIndex("-1");
    this.triggerElement.addEventListener("click", async (e) => {
      await this._openDrawer(e);
    });
  }

  protected willUpdate(): void {
    this._firstFocusableEl = this._focusableEls[0] as HTMLElement;
    this._lastFocusableEl = this._focusableEls[this._focusableEls.length - 1] as HTMLElement;
  }

  private async _closeDrawer(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.open = false;
    await this.updateComplete;
    this.cleanupFocusTrap();
  }

  private async _openDrawer(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.open = true;
    await this.updateComplete;
    this.focusTrap();
  }

  private handleEcape(e: KeyboardEvent) {
    if (!(e.key === "Esc" || e.key === "Escape")) return;
    this.open = false;
  }

  private handleFocusTrap(e: KeyboardEvent) {
    if (!(this.renderRoot instanceof ShadowRoot)) return;
    const activeEl = this.renderRoot.activeElement;
    const isTabPressed = e.key === "Tab";
    if (!isTabPressed) return;

    if (e.shiftKey && activeEl === this._firstFocusableEl) {
      this._lastFocusableEl.focus();
      e.preventDefault();
    }
    if (!e.shiftKey && activeEl === this._lastFocusableEl) {
      this._firstFocusableEl.focus();
      e.preventDefault();
    }
  }

  private returnInitialFocus() {
    this.triggerElement.focus();
  }

  private cleanupFocusTrap() {
    this.removeEventListener("keydown", this.handleFocusTrap);
    this.removeEventListener("keydown", this.handleEcape);
    this.setAllTabIndex("-1");
    this.returnInitialFocus();
  }

  private focusTrap() {
    this.setAllTabIndex("0");
    this._firstFocusableEl.focus();
    this.addEventListener("keydown", this.handleFocusTrap);
    this.addEventListener("keydown", this.handleEcape);
  }

  private setAllTabIndex(tabIndex: "0" | "1" | "-1") {
    this._focusableEls.forEach((el) => {
      el.setAttribute("tabindex", tabIndex ?? "-1");
    });
  }
}

export default MenuDrawer;
