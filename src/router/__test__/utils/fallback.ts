import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("fallback-test")
export default class Fallback extends LitElement {
  protected render() {
    return html`<div data-testid="fallback-test">
      A placeholder fallback page for testing purpose
    </div>`;
  }
}
