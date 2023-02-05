import { html, LitElement } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { drawerStyles } from "./styles";

@customElement("menu-drawer")
class MenuDrawer extends LitElement {
  static styles = [drawerStyles];

  @queryAll("a:not([disabled]), button:not([disabled])")
  _focusableEls!: NodeListOf<HTMLElement>;

  private _firstFocusableEl: HTMLElement;

  private _lastFocusableEl: HTMLElement;

  @property() open: boolean = false;

  @property() triggerElement: HTMLElement;

  protected render(): unknown {
    return html`
      <div
        id="overlay"
        class=${classMap({ menu__overlay: true, "is-open": this.open })}
        @click="${this._closeDrawer}"
      ></div>
      <div id="menu" class=${classMap({ menu: true, "is-open": this.open })}>
        <button
          type="button"
          id="close-menu"
          class="menu__close click-area"
          aria-label="close menu"
          @click="${this._closeDrawer}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style="width: 25px;"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <nav class="menu__nav">
          <ul class="menu__list">
            <li class="menu__item"><a class="menu__link click-area" href="#/">Home</a></li>
            <li class="menu__item">
              <a class="menu__link click-area" href="#/favorites">Favorite</a>
            </li>
            <li class="menu__item">
              <a class="menu__link click-area" href="https://www.fazzaamiarso.me" target="_blank"
                >About Us</a
              >
            </li>
          </ul>
        </nav>
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
