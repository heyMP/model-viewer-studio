// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";

class XPreview extends MobxLitElement {
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
    slot.addEventListener("slotchange", e => {
      let nodes = slot.assignedNodes();
      for (const node of nodes) {
        if (node.nodeName === "MODEL-VIEWER") {
          store.modelViewer = node;
          node.addEventListener("click", this.__handleClick.bind(this));
        }
      }
    });
  }

  __handleClick(event) {
    // see if we should
    if (!store.editing) {
      return;
    }
    // if we clicked on a model then add a hotspot
    if (event.target.nodeName === "MODEL-VIEWER") {
      // get position
      const position = this.__getPositionAndNormal(event);
      // add hotspot
      if (position) {
        store.updateTemporaryHotspot(position)
      }
    }
    else {
      // if we clicked on a hotspot then set that as active hotspot
      // we first need to find the slot element which is the highest element of the hotspot
      const hotspot = event.target.closest(`[slot]`)
      if (hotspot) {
        store.editHotspot(hotspot);
      }
    }
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
    return "xxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

customElements.define("x-preview", XPreview);
