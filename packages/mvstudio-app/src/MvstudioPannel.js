import { html, css, LitElement } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { classMap } from 'lit-html/directives/class-map.js';
import { store } from './lib/store.js';
import "@vaadin/vaadin";

export class MvstudioPannel extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        z-index: 999;
      }

      button {
        display: flex;
        width: 100%;
        justify-items: center;
        align-items: center;
        width: auto;
        border: none;
      }
    `;
  }

  render() {
    // get a list of the selected mong
    const selected = `[${store.hotspots.map((i, index) => (i.hidden) ? null : index).filter(i => (i !== null)).join(',')}]`;
    return html`
      <a role="button" @click=${e => store.toggleHotspotsOn()}>Toggle All On</a>
      <a role="button" @click=${e => store.toggleHotspotsOff()}>Toggle All Off</a>
      <vaadin-list-box multiple selected-values="${selected}" @selected-values-changed=${this.__itemSelectedHandler}>
      ${store.hotspots.map(
        hotspot => html`
          <vaadin-item>${hotspot.target.innerText}</vaadin-item>
        `,
      )}
      </vaadin-list-box>
    `;
  }

  __itemSelectedHandler({detail}) {
    if (detail.value) {
      store.hotspots = store.hotspots.map((i, index) => {
        i.hidden = !detail.value.includes(index);
        return i;
      })
    }
  }
}

window.customElements.define('mvstudio-pannel', MvstudioPannel);
