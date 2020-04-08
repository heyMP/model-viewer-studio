import { html, css, LitElement } from 'lit-element';

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
    const findAllDeep = (parent, selectors, depth = null) => {
      let nodes = [];
      let currentDepth = 1; 
      const recursiveSeek = (_parent) => {
        // record the nodes
        for (let child of _parent.assignedNodes({flatten: true})) {
          // if it is a legit element
          if (child.querySelector) {
            // save the found nodes and keep moving
            const foundItems = child.querySelectorAll(selectors)
            nodes = [...nodes, ...foundItems]
            // now loop of each of the found see if we can sniff out more slots
            if (depth && currentDepth < depth) {
              for (let foundItem of foundItems) {
                if (foundItem.querySelectorAll) {
                  for (let slot of _parent.querySelectorAll('slot')) {
                    console.log('slot:', slot)
                    recursiveSeek(slot);
                  }
                }
              }
            }
          }
        }
      }
      recursiveSeek(parent);
      return nodes
    }
    const nodes = findAllDeep(this.shadowRoot.querySelector('slot'), 'button');
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
