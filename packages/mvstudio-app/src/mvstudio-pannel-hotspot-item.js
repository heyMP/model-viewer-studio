import { html, css, LitElement } from 'lit-element';
import "@vaadin/vaadin-button/vaadin-button.js";
import "@vaadin/vaadin-item/vaadin-item.js";
import { store } from "./lib/store.js"

export class MvstudioPannelHotspotItem extends LitElement {
  static get properties() {
    return {
      hotspot: { type: Object }
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  constructor() {
    super();
    this.hotspot = null;
  }

  render() {
    // get a list of the selected mong
    if (this.hotspot) {
      const hotspot = this.hotspot;
      return html`
        ${hotspot.target.innerText} <vaadin-button id="edit" @click=${this.__editHotspot}>edit</vaadin-button>
      `;
    }
    else {
      return html``
    }
  }

  __editHotspot(e) {
    e.preventDefault();
    store.editHotspot(this.hotspot.target);
    return false;
  }
}

window.customElements.define('mvstudio-pannel-hotspot-item', MvstudioPannelHotspotItem);
