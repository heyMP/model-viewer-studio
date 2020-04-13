import { html, css, LitElement } from 'lit-element';
import { findAllDeep } from './lib/util.js'
import { store } from "./lib/store.js"
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
    `;
  }

  async firstUpdated() {
    const hotspots = findAllDeep(this.shadowRoot.querySelector('slot'), `[slot*="hotspot"]`, 1);
    store.hotspots = hotspots;
  }

  render() {
    return html`
      <mvstudio-pannel></mvstudio-pannel>
      <div id="slot">
        <slot></slot>
      </div>
    `;
  }
}
