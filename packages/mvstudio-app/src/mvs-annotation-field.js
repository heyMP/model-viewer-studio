// @ts-check
import { LitElement, html, css } from "lit-element/lit-element.js";
import { MobxLitElement } from "@adobe/lit-mobx/lit-mobx.js";
import { store } from "./lib/store.js";
import { autorun } from "mobx"

class MVSAnnotationField extends MobxLitElement {
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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.disposers.forEach(reaction => {
      reaction.dispose();
    })
    super.disconnectedCallback();
  }

  updateAnnotationValue(value) {
    const textarea = this.shadowRoot.querySelector("textarea");
    if (textarea) {
      textarea.innerHTML = value;
    }
  }

  firstUpdated() {
    this.disposers = [
      autorun(() => {
        this.updateAnnotationValue(store.temporaryHotspot.annotation);
      })
    ];
  }

  render() {
    return html`
      <textarea
        name="annotation"
        @input=${e => {
          store.temporaryHotspot.annotation = e.target.value;
        }}
      ></textarea>
    `;
  }
}

customElements.define("mvs-annotation-field", MVSAnnotationField);
