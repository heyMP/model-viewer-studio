// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";
import "./mvs-edit-panel.js"

class MVSPanel extends MobxLitElement {
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
        display: block;
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
        <h2>Edit Hotspots</h2>
        <mvs-edit-panel></mvs-edit-panel>
      </div>
    `;
  }
}

customElements.define("mvs-panel", MVSPanel);
