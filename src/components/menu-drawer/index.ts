/* eslint-disable no-underscore-dangle */
import "./menu-drawer.style.scss";

class MenuDrawer extends HTMLElement {
  private focusableEls: NodeListOf<HTMLElement>;

  private firstFocusableEl: HTMLElement;

  private lastFocusableEl: HTMLElement;

  private isOpen: boolean;

  constructor() {
    const drawerTemplate = document.querySelector("#menu-drawer-template") as HTMLTemplateElement;

    super();

    this.appendChild(drawerTemplate.content.cloneNode(true));

    this.focusableEls = this.querySelectorAll("a:not([disabled]), button:not([disabled])");
    this.firstFocusableEl = this.focusableEls[0] as HTMLElement;
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1] as HTMLElement;

    this.setAllTabIndex("-1");
  }

  connectedCallback() {
    const closeBtn = this.querySelector("#close-menu") as HTMLButtonElement;
    const overlay = this.querySelector("#overlay") as HTMLButtonElement;
    [overlay, closeBtn].forEach((el) => {
      el.addEventListener("click", (e) => {
        this.open = undefined;
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  get open() {
    return String(this.hasAttribute("open"));
  }

  set open(val: string | undefined) {
    if (val) {
      this.setAttribute("open", "");
      this.focusTrap();
    } else {
      this.removeAttribute("open");
      this.cleanupFocusTrap();
    }
    this.isOpen = this.hasAttribute("open");
    this.toggleStyle();
  }

  private toggleStyle() {
    const isOpen = Boolean(this.isOpen);
    const menuEl = this.querySelector("#menu") as HTMLElement;
    const overlayEl = this.querySelector("#overlay") as HTMLElement;

    menuEl.style.transform = isOpen ? "translateX(0)" : "translateX(100%)";
    overlayEl.style.opacity = isOpen ? "1" : "0";
    overlayEl.style.transform = isOpen ? "scale(1)" : "scale(0)";
  }

  private handleEcape(e: KeyboardEvent) {
    if (!(e.key === "Esc" || e.key === "Escape")) return;
    this.open = undefined;
  }

  private handleFocusTrap(e: KeyboardEvent) {
    const activeEl = document.activeElement;
    const isTabPressed = e.key === "Tab";
    if (!isTabPressed) return;

    if (e.shiftKey && activeEl === this.firstFocusableEl) {
      this.lastFocusableEl.focus();
      e.preventDefault();
    }
    if (!e.shiftKey && activeEl === this.lastFocusableEl) {
      this.firstFocusableEl.focus();
      e.preventDefault();
    }
  }

  private returnInitialFocus() {
    const triggerEl = document.querySelector(`#${this.dataset.triggerId}`) as HTMLElement;
    triggerEl.focus();
  }

  private cleanupFocusTrap() {
    this.removeEventListener("keydown", this.handleFocusTrap);
    this.removeEventListener("keydown", this.handleEcape);
    this.setAllTabIndex("-1");
    this.returnInitialFocus();
  }

  private focusTrap() {
    this.setAllTabIndex("0");
    this.firstFocusableEl.focus();
    this.addEventListener("keydown", this.handleFocusTrap);
    this.addEventListener("keydown", this.handleEcape);
  }

  private setAllTabIndex(tabIndex: "0" | "1" | "-1") {
    this.focusableEls.forEach((el) => {
      el.setAttribute("tabindex", tabIndex ?? "-1");
    });
  }
}

customElements.define("menu-drawer", MenuDrawer);

export default MenuDrawer;
