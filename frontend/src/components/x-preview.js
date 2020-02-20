// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import "../../web_modules/@google/model-viewer.js";
import "./x-model-hotspot.js";

class XPreview extends LitElement {
  static get properties() {
    return {
      src: { type: String }
    };
  }

  constructor() {
    super();
    this.src = null;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  firstUpdated() {
    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener('slotchange',  e => {
      let nodes = slot.assignedNodes();
      for (const node of nodes) {
        if (node.nodeName === "MODEL-VIEWER") {
          node.addEventListener("click", this.__handleClick.bind(this))
        }
      }
    });
  }

  __handleClick(event) {
    const target = event.target;
    // see if we should 
    // get position
    const position = this.__getPositionAndNormal(event);
    // add hotspot
    if (position)  {
      this.__addHotSpot(target, position);
    }
  }

  __addHotSpot(target, position) {
    let hotspot = `
      <button
        slot="hotspot-${this.__generateUuid()}"
        data-position="${position.position.toString()}"
        data-normal="${position.normal.toString()}"
        data-visibility-attribute="visible"
      >
    `
    target.insertAdjacentHTML("beforeend", hotspot);
  }

  __getPositionAndNormal(event) {
    const viewer = event.target;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const positionAndNormal = viewer.positionAndNormalFromPoint(x, y);

    if (positionAndNormal == null) {
      return null;
    }
    return positionAndNormal;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  __generateUuid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

customElements.define("x-preview", XPreview);
