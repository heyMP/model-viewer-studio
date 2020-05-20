import { html, css, LitElement } from 'lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { classMap } from 'lit-html/directives/class-map.js';
import { store, STATES } from './lib/store.js';
import { toJS } from 'mobx';
import "@vaadin/vaadin-list-box/vaadin-list-box.js";
import "@vaadin/vaadin-button/vaadin-button.js";
import "@vaadin/vaadin-item/vaadin-item.js";
import "./mvs-preview.js";
import "./mvstudio-pannel-hotspot-item.js";
import "./mvs-edit-panel.js";
import "./mvs-camera-target-edit.js";

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

  renderHotspotListItems() {
    const renderItem = (hotspot) => {
      if (store.editing && hotspot.target && store.temporaryHotspot) {
        if (hotspot.target.id === store.temporaryHotspot.id) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return true;
      }
    }
    return store.hotspots.map(
        hotspot => html`
          ${renderItem(hotspot) ? html`
            <vaadin-item>
              <mvstudio-pannel-hotspot-item .hotspot=${hotspot}></mvstudio-pannel-hotspot-item>
            </vaadin-item>
          `: html``}
        `,
      )
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
        ${this.renderHotspotListItems()}
        <mvs-edit-panel></mvs-edit-panel>
      </vaadin-list-box>
    ${store.state === STATES.CONNECTED ? html`
        <vaadin-button @click=${e => store.startEditing() }>Edit</vaadin-button>
      ` : html` `}
      ${store.state === STATES.EDIT ? html`
        <vaadin-button @click=${e => store.save()}>Save</vaadin-button>
        <vaadin-button @click=${e => store.cancel()}>Cancel</vaadin-button>
      ` : html` `}
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
