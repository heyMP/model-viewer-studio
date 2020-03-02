// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import "./x-keyboard-shortcuts.js";
import { store } from "../store.js";

class XPreview extends MobxLitElement {

  constructor() {
    super();
    this.__shiftKey = false;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
      x-keyboard-shortcuts {
        position: absolute;
        right: 100%;
        bottom: 100%;
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
          store.modelViewer.addEventListener("click", this.__handleClick.bind(this));
          store.modelViewer.addEventListener("focus", this.__focusHotspot.bind(this), true);
          store.modelViewer.addEventListener("keydown", this.__keydown.bind(this));
          store.modelViewer.addEventListener("keyup", this.__keyup.bind(this));
        }
      }
    });
  }

  __handleClick(event) {
    // Find out if we are trying to set the orbital focus
    if (this.__shiftKey) {
      this.__setOrbitalFocus(event);
      return;
    }
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
        store.updateTemporaryHotspot(position);
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

  // Track shiftKey events
  __keydown(event) {
    this.__shiftKey = event.shiftKey;
  }
  __keyup(event) {
    this.__shiftKey = event.shiftKey;
  }
  // If we are 
  __focusHotspot(event) {
    if (!store.editing) {
      return;
    }
    else {
      const hotspot = event.target.closest(`[slot]`)
      if (hotspot) {
        store.editHotspot(hotspot);
      }
    }
  }

  __setOrbitalFocus(event) {
    const position = this.__getPositionAndNormal(event);
    if (position) {
      store.modelViewer.setAttribute("camera-target", position.position.toString());
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

  __generateUuid() {
    return "xxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  disconnectedCallback() {
    store.modelViewer.removeEventListener("click", this.__handleClick.bind(this));
    store.modelViewer.removeEventListener("focus", this.__focusHotspot.bind(this), true);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <x-keyboard-shortcuts></x-keyboard-shortcuts>
      <slot></slot>
    `;
  }
}

customElements.define("x-preview", XPreview);
