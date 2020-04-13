import { html, css, LitElement } from 'lit-element';
import { MobxLitElement } from "@adobe/lit-mobx";
import { store } from "./lib/store.js";

export class MvstudioPannel extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        z-index: 999;
      }
    `;
  }

  render() {
    return html`
      ${store.hotspots.map(hotspot => html`
        <div>
          <button class="hotspot" @click=${e => store.activateHotspot(hotspot)} }>${hotspot.innerText}</button>
        </div>
      `)}
    `;
  }
}

window.customElements.define('mvstudio-pannel', MvstudioPannel);