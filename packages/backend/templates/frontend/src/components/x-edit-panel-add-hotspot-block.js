// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";

class XEditPanelAddHotspotBlock extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        overflow: hidden;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }

      #container {
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed blue;
      }
    `;
  }

  render() {
    return html`
      <div id="container">
        <p>Click on the model to add new hotspot<p>
      </div>
    `;
  }
}

customElements.define("x-edit-panel-add-hotspot-block", XEditPanelAddHotspotBlock);
