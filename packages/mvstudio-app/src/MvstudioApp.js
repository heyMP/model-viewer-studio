import { html, css, LitElement } from 'lit-element';
import { findAllDeep } from './lib/util.js'
import { store } from "./lib/store.js"
import "@vaadin/vaadin-app-layout";
import "./MvstudioPannel.js";

export class MvstudioApp extends LitElement {
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
    `;
  }

  async firstUpdated() {
    // gather the hotspots
    const hotspots = findAllDeep(this.shadowRoot.querySelector('slot'), `[slot*="hotspot"]`, 1);
    store.storeRawHotspots(hotspots);
  }

  render() {
    return html`
    <vaadin-app-layout>
      <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
      <h1 id="title" slot="navbar">Model Viewer Studio</h1>
      <div slot="drawer" orientation="vertical" theme="minimal" style="margin: 0 auto; flex: 1;">
        <mvstudio-pannel></mvstudio-pannel>
      </div>

      <div class="content">
        <div id="slot">
          <slot></slot>
        </div>
      </div>
    </vaadin-app-layout>
    `;
  }
}