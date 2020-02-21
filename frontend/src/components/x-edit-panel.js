// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "../store.js";

class XEditPanel extends MobxLitElement {
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
    return html`
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
        : html``}

      <button .disabled=${!editing} @click=${() => store.save()}>Save</button>
      <button .disabled=${!editing} @click=${() => store.deleteHotspot()}>Delete</button>
      <button @click=${() => store.stopEditing()}>Cancel</button>
    `;
  }
}

customElements.define("x-edit-panel", XEditPanel);
