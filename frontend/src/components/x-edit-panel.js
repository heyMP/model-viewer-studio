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

      <div class="input-field">
        <label for="id">ID:</label>
        <input
          name="id"
          .value=${store.activeHotspot.id}
          @keypress=${e => {
            store.activeHotspot.id = e.target.value;
          }}
        />
      </div>

      <div class="input-field">
        <label for="position">position:</label>
        <input
          name="position"
          .value=${store.activeHotspot.position}
          @keypress=${e => {
            store.activeHotspot.position = e.target.value;
          }}
        />
      </div>

      <div class="input-field">
        <label for="normal">normal:</label>
        <input
          name="normal"
          .value=${store.activeHotspot.normal}
          @keypress=${e => {
            store.activeHotspot.normal = e.target.value;
          }}
        />
      </div>

      ${store.hotspotEditing ? html`
        <button>Save Hotspot Change</button>
        <button>Reset Hotspot Change</button>
      ` : html`
        <button @click=${() => store.startHotspotEditing()}>Edit Hotspot</button>
      `}

      ${JSON.stringify(store.activeHotspot)}
    `;
  }
}

customElements.define("x-edit-panel", XEditPanel);
