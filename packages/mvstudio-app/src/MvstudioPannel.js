import { html, css, LitElement } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { classMap } from 'lit-html/directives/class-map.js';
import { store } from './lib/store.js';
import { toJS } from 'mobx';
import "@vaadin/vaadin-list-box/vaadin-list-box.js";
import "@vaadin/vaadin-button/vaadin-button.js";
import "@vaadin/vaadin-item/vaadin-item.js";
import "./mvs-preview.js"
import "./mvstudio-pannel-hotspot-item.js"

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

      #toggles {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }

      vaadin-button {
        font-size: 12px;
      }

      #hotspots-header {
        margin: auto;
      }
    `;
  }

  render() {
    // get a list of the selected mong
    const selected = `[${store.hotspots.map((i, index) => (i.hidden) ? null : index).filter(i => (i !== null)).join(',')}]`;
    return html`
      <vaadin-list-box multiple selected-values="${selected}" @selected-values-changed=${this.__itemSelectedHandler}>
        <hr>
        <div id="toggles">
          <vaadin-button @click=${e => store.toggleHotspotsOn()}>Toggle All On</vaadin-button>
          <vaadin-button @click=${e => store.toggleHotspotsOff()}>Toggle All Off</vaadin-button>
        </div>
        <hr>
      ${store.hotspots.map(
        hotspot => html`
          <vaadin-item><mvstudio-pannel-hotspot-item .hotspot=${hotspot}></mvstudio-pannel-hotspot-item></vaadin-item>
        `,
      )}
      </vaadin-list-box>
      ${!store.editing ? html`` : html``}
      ${store.editing ? html`
        <vaadin-button @click=${e => store.save()}>Save Hotspots</vaadin-button>
      ` : html``}
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
