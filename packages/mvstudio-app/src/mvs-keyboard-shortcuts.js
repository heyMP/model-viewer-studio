// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";
import "./mvs-edit-panel.js"

class MVSKeyboardShortcuts extends MobxLitElement {
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

customElements.define("mvs-keyboard-shortcuts", MVSKeyboardShortcuts);
