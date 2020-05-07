// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";

class MVSCameraTargetEdit extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        overflow: hidden;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  render() {
    const cameraTarget = store.modelViewer.getAttribute("camera-target");
    return html`
      ${store.editing ? html`
        <div class="input-field">
          <label for="camera-target">Camera Target:</label>
          ${cameraTarget}
        </div>
      ` : html``}
    `
  }
}

customElements.define("mvs-camera-target-edit", MVSCameraTargetEdit);
