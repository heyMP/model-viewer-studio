import { html, css, LitElement } from 'lit-element';
import "@vaadin/vaadin-button/vaadin-button.js";
import "@vaadin/vaadin-item/vaadin-item.js";
import { store, STATES } from "./lib/store.js"
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

      #delete {
        color: #df2525;
        font-size: .8em;
      }
    `;
  }
  constructor() {
    super();
    this.hotspot = null;
  }

  renderDeleteButton() {
    if (store.state === STATES.EDIT) {
      return html`
        <vaadin-button id="delete" theme="tertiary" @click=${this.__delete}>delete</vaadin-button>
      `;
    }
    else {
      return '';
    }
  }

  render() {
    // get a list of the selected mong
    if (this.hotspot) {
      const hotspot = this.hotspot;
      return html`
        ${hotspot.target.innerText}
        ${this.renderDeleteButton()}
      `;
    }
    else {
      return html``
    }
  }

  __delete(e) {
    e.preventDefault();
    e.stopPropagation();

    store.deleteHotspot(this.hotspot);
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
