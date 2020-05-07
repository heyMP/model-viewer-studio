// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";
import "./mvs-edit-panel-add-hotspot-block.js"

class MVSEditPanel extends MobxLitElement {
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

      .input-field {
        display: block;
        padding: 10px;
      }
    `;
  }

  render() {
    const editing = store.editing && store.temporaryHotspot !== null;
    const cameraTarget = store.modelViewer.getAttribute("camera-target");
    return html`
      ${store.editing ? html`
        <div class="input-field">
          <label for="camera-target">Camera Target:</label>
          ${cameraTarget}
        </div>
      ` : html``}
      ${editing
        ? html`
            <div class="input-field">
              <label for="id">ID:</label>
              <input
                name="id"
                .value=${store.temporaryHotspot.id}
                @input=${e => {
                  store.temporaryHotspot.id = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="position">position:</label>
              <input
                name="position"
                .value=${store.temporaryHotspot.position}
                @input=${e => {
                  store.temporaryHotspot.position = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="normal">normal:</label>
              <input
                name="normal"
                .value=${store.temporaryHotspot.normal}
                @input=${e => {
                  store.temporaryHotspot.normal = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="annotation">annotation:</label>
              <input
                name="annotation"
                .value=${store.temporaryHotspot.annotation}
                @input=${e => {
                  store.temporaryHotspot.annotation = e.target.value;
                }}
              />
            </div>
          `
        : html`
        `}

      ${editing ? html`
        <button .disabled=${!editing} @click=${() => store.deleteHotspot()}>Delete</button>
      ` : ''}
    `;
  }
}

customElements.define("mvs-edit-panel", MVSEditPanel);
