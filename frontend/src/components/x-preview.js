// @ts-check
import { LitElement, html, css } from "../../web_modules/lit-element.js";
import "../../web_modules/@google/model-viewer.js";
import "./x-model-hotspot.js"

class XPreview extends LitElement {
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
        width: 100%;
        height: 100%;
        position: relative;
        background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
      }

      model-viewer {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      button {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        border: none;
        background-color: white;
        box-sizing: border-box;
        box-shadow: 2px 2px 5px rgba(255,255,255,0.1), -2px -2px 5px rgba(0,0,0,0.1);
      }

      #annotation {
        background-color: white;
        position: absolute;
        transform: translate(50%, -50%);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(255,255,255,0.2), -2px -2px 5px rgba(0,0,0,0.2);
        padding: 10px;
        opacity: 0;
      }

      [data-visible] #annotation {
        opacity: 1;
      }
      /* This keeps child nodes hidden while the element loads */
      :not(:defined) > * {
        display: none;
      }
    `;
  }

  firstUpdated() {
    const viewer = this.shadowRoot.querySelector("model-viewer")
    viewer.addEventListener("click", this.__getPositionAndNormal.bind(this));
  }

  __getPositionAndNormal(event) {
    const viewer = event.target;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const positionAndNormal = viewer.positionAndNormalFromPoint(x, y);
  
    if (positionAndNormal == null) {
      console.log('no hit result: mouse = ', x, ', ', y);
      return;
    }
    const {position, normal} = positionAndNormal;
    console.log('positionAndNormal:', positionAndNormal)
  }

  render() {
    return html`
      <model-viewer
        src=${this.src}
        alt=${this.alt}
        auto-rotate
        camera-controls
      >
        ${}
        <button slot="hotspot-bone-1" data-position="0.16 0.11 0.15" data-normal="0 1 0.75" data-visibility-attribute="visible">
          <div id="annotation">Bone 1 </div>
        </button>
      </model-viewer>
    `;
  }

  // __hotspotClicked(e) {
  //   const visible = e.target.dataset.visible
  //   if (visible === "") {
  //     delete e.target.dataset.visible
  //   }
  //   else {
  //     e.target.dataset.visible = "";
  //   }
  // }
}


customElements.define("x-preview", XPreview);
