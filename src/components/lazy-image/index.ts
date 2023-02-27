import { LitElement, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { customElement, property, query, state } from "lit/decorators.js";
import { resetStyles } from "@/styles/reset";

@customElement("lazy-image")
export default class LazyImage extends LitElement {
  static styles = [resetStyles];

  @property({ reflect: true }) src: string | undefined = undefined;

  @property({ reflect: true }) alt = "";

  @property({ reflect: true, type: String }) width = "";

  @property({ reflect: true, type: String }) height = "";

  @property({ type: String })
  "data-src" = "";

  @property()
  imageStyle: { [name: string]: string | undefined | null } = {};

  @state()
  _useNative = false;

  @query("img")
  imgElement!: HTMLImageElement;

  constructor() {
    super();
    if (this._checkBrowserSupport()) {
      this._useNative = true;
    }
  }

  private _checkBrowserSupport() {
    return "loading" in HTMLImageElement.prototype;
  }

  private _loadImage() {
    this.src = this["data-src"];
  }

  firstUpdated() {
    const isIntersectionObserverSupported = "IntersectionObserver" in window;
    if (this._useNative || !isIntersectionObserverSupported) {
      this._loadImage();
      return;
    }
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this._loadImage();
        observer.disconnect();
      }
    };
    const observerOptions: IntersectionObserverInit = {
      rootMargin: "200px 0px 0px 0px",
    };
    const imageObserver = new IntersectionObserver(observerCallback, observerOptions);
    imageObserver.observe(this.imgElement);
  }

  protected render() {
    return html` <img
      style=${styleMap(this.imageStyle)}
      src=${ifDefined(this.src)}
      alt=${this.alt}
      aria-hidden=${this.src ? "false" : "true"}
      width=${ifDefined(this.width)}
      height=${ifDefined(this.height)}
      loading=${ifDefined(this._useNative ? "lazy" : undefined)}
    />`;
  }
}
