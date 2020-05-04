// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";

class MVSToolbar extends MobxLitElement {
  static get properties() {
    return {
      src: { type: String }
    };
  }

  constructor() {
    super();
    this.src = null;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        position: relative;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  firstUpdated() {}

  renderEditingButtons() {
    return html`
      ${store.connected
        ? html`
            ${store.editing
              ? html`
                  <button title="Save Hotspots" @click=${() => store.save()}>
                    Save
                  </button>
                  <button
                    title="Cancel editing process"
                    @click=${() => store.stopEditing()}
                  >
                    Cancel
                  </button>
                `
              : html`
                  <button
                    title="Start editing"
                    @click=${() => store.startEditing()}
                  >
                    Edit Hotspots
                  </button>
                `}
          `
        : html`
            Connecting...
          `}
    `;
  }

  render() {
    return html`
      <div id="toolbar">
        ${this.renderEditingButtons()}
      </div>
    `;
  }
}

customElements.define("mvs-toolbar", MVSToolbar);
