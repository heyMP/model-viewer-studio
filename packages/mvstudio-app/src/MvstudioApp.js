import { html, css, LitElement } from 'lit-element';
import { findAllDeep } from './lib/util.js'
import { store } from "./lib/store.js"
import "@vaadin/vaadin-app-layout/vaadin-app-layout.js";
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle.js";
import "./MvstudioPannel.js";
import "./mvs-preview.js";

export class MvstudioApp extends LitElement {
  static get properties() {
    return {
      /**
       * Location of the active model on the file system.
       * This is necessary when running in headless mode.
       */
      location: { type: String },
      title: { type: String },
      endpoint: { type: String }
    }
  }

  constructor() {
    super();
    this.title = null;
    this.location = null;
    this.endpoint = null;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: auto;
        height: auto;
        flex: 1 1 auto;
        position: relative;
      }

      ::slotted(model-viewer) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      .content {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
      }

      #title {
        font-size: 16px;
      }

      mvs-preview {
        height: 100vh;
        width: 100%;
      }
    `;
  }

  async firstUpdated() {
    // gather the hotspots
    const hotspots = findAllDeep(this.shadowRoot.querySelector('slot'), `[slot*="hotspot"]`, 1);
    store.storeRawHotspots(hotspots);
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "location") {
        store.location = this.location;
      }
      if (propName === "endpoint") {
        // if an endpoint is specified
        if (this.endpoint) {
          store.endpoint = this.endpoint;
        }
      }
    });
  }

  render() {
    return html`
    <vaadin-app-layout>
      <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
      ${this.title ? html`
        <h1 id="title" slot="navbar">${this.title}</h1>
      `:''}
      <div slot="drawer" orientation="vertical" theme="minimal" style="margin: 0 auto; flex: 1;">
        <mvstudio-pannel></mvstudio-pannel>
      </div>

      <div class="content">
        <div id="slot">
          <mvs-preview height="100vh" width="100%">
            <slot></slot>
          </mvs-preview>
        </div>
      </div>

    </vaadin-app-layout>
    `;
  }
}