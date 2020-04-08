import { html, css, LitElement } from 'lit-element';
import { findAllDeep } from './lib/util.js'

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
    const nodes = findAllDeep(this.shadowRoot.querySelector('slot'), 'button', 1);
    console.log('nodes:', nodes)
  }

  render() {
    return html`
      <div id="slot">
        <slot></slot>
      </div>
    `;
  }
}
