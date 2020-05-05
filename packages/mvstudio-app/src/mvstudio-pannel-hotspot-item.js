import { html, css, LitElement } from 'lit-element';
import "@vaadin/vaadin-button/vaadin-button.js";
import "@vaadin/vaadin-item/vaadin-item.js";
import { store } from "./lib/store.js"
import { toJS } from 'mobx';
import { MobxLitElement } from '@adobe/lit-mobx';

export class MvstudioPannelHotspotItem extends MobxLitElement {
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

  renderEditButton() {
    if (store.editing) {
      if (this.hotspot.target.id === store.temporaryHotspot.id) {
        return html`
            <vaadin-button id="edit" @click=${this.__saveHotspot}>Stop</vaadin-button>
          `
      }
      return html``
    }
    else {
        return html`
          <vaadin-button id="edit" @click=${this.__editHotspot}>Edit</vaadin-button>
        `
    }
  }

  render() {
    // get a list of the selected mong
    if (this.hotspot) {
      const hotspot = this.hotspot;
      return html`
        ${hotspot.target.innerText}
        ${this.renderEditButton()}
      `;
    }
    else {
      return html``
    }
  }

  __saveHotspot(e) {
    e.preventDefault();
    e.stopPropagation();

    store.saveTemporaryHotspot();
    return false;
  }

  __editHotspot(e) {
    e.preventDefault();
    e.stopPropagation();

    store.editHotspot(this.hotspot.target);
    return false;
  }
}

window.customElements.define('mvstudio-pannel-hotspot-item', MvstudioPannelHotspotItem);
