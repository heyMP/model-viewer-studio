// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";
import "./x-edit-panel.js"

class XPanel extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
      #panel {
        background: white;
        display: flex;
        position: relative;
        width: 30vw;
        max-width: 400px;
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        height: 100vh;
        transform: translateX(-100%);
        transition: all 0.3s ease-in-out;
      }

      #panel.editing {
        transform: translateX(0);
        box-shadow: -15px 0 40px;
      }
    `;
  }

  render() {
    return html`
      <div id="panel" class="${store.editing ? 'editing': ''}">
        <x-edit-panel></x-edit-panel>
      </div>
    `;
  }
}

customElements.define("x-panel", XPanel);
