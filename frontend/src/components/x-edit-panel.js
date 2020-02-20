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
    return html`
      ${store.editing && store.temporaryHotspot !== null
        ? html`
            <div class="input-field">
              <label for="id">ID:</label>
              <input
                name="id"
                .value=${store.temporaryHotspot.id}
                @keypress=${e => {
                  store.temporaryHotspot.id = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="position">position:</label>
              <input
                name="position"
                .value=${store.temporaryHotspot.position}
                @keypress=${e => {
                  store.temporaryHotspot.position = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="normal">normal:</label>
              <input
                name="normal"
                .value=${store.temporaryHotspot.normal}
                @keypress=${e => {
                  store.temporaryHotspot.normal = e.target.value;
                }}
              />
            </div>

            <div class="input-field">
              <label for="annotation">annotation:</label>
              <input
                name="annotation"
                .value=${store.temporaryHotspot.annotation}
                @keypress=${e => {
                  store.temporaryHotspot.annotation = e.target.value;
                }}
              />
            </div>

            <button @click=${() => store.saveTemporaryHotspot()}>Save</button>
          `
        : html``}
    `;
  }
}

customElements.define("x-edit-panel", XEditPanel);
