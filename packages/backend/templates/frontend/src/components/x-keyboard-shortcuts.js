// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";
import "./x-edit-panel.js"

class XKeyboardShortcuts extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  render() {
    return html`
      shiftKey + click
    `;
  }
}

customElements.define("x-keyboard-shortcuts", XKeyboardShortcuts);
