import { LitElement, html, css } from "../../web_modules/lit-element.js";
import "../../web_modules/@google/model-viewer.js";

class XModelHotspot extends LitElement {
  static get properties() {
    return {
      annotation: { type: String }
    };
  }

  constructor() {
    super();
    this.annotation = null;
  }

  static get styles() {
    return css`
      button {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: none;
        background-color: blue;
        box-sizing: border-box;
      }

      button:not([data-visible]) {
        background-color: transparent;
        border: 3px solid blue;
      }

      #annotation {
        background-color: #888888;
        position: absolute;
        transform: translate(10px, 10px);
        border-radius: 10px;
        padding: 10px;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <button slot="hotspot-foot" data-position="0.16 0.11 0.15" data-normal="0 1 0.75" data-visibility-attribute="visible">
        <div id="annotation"><slot></slot></div>
      </button>
    `;
  }
}


customElements.define("x-model-hotspot", XModelHotspot);
