import {
  observable,
  decorate,
  computed,
  action,
  autorun
} from "../web_modules/mobx.js";

class Store {
  constructor() {
    this.modelViewer = null;

    this.editing = true;

    this.activeHotspot = Object.assign(
      {},
      { id: "", position: "", normal: "", reference: null, new: true }
    );
    this.temporaryHotspot = {};
    this.hotspotEditing = false;
    this.temporaryHotspot = null;
  }

  startEditing() {
    this.editing = true;
  }

  stopEditing() {
    this.editing = false;
  }

  save() {
    this.editing = false;
  }

  startHotspotEditing() {
    this.hotspotEditing = true;
    // create a new temporary hotspot to edit.
  }

  updateHotspotPositions({ position, normal }) {
    this.hotspotEditing = false;
    this.activeHotspot.position = position;
    this.activeHotspot.normal = normal;
  }

  updateTemporaryHotspot(position) {
    const slotName = `hotspot-${generateUuid()}`
    let hotspot = `
      <button
        slot="${slotName}"
        data-position="${position.position.toString()}"
        data-normal="${position.normal.toString()}"
        data-visibility-attribute="visible"
      >
    `;
    this.modelViewer.insertAdjacentHTML("beforeend", hotspot);
    const node = this.modelViewer.querySelector(`[slot="${slotName}"]`)
    // remove the old hotspot from DOM
    if (this.temporaryHotspot) {
      this.temporaryHotspot.remove();
    }
    // store this as a temporary hotspot
    this.temporaryHotspot = node;
    // insert the hotspot into the DOM
    this.modelViewer.insertAdjacentHTML("beforeend", node);
  }

  saveTemporaryHotspot() {
    // remove temporary hotspot
    this.temporaryHotspot.remove();
  }

  get hotspotIsNew() {
    return this.hotspotIsNew.new === true;
  }

  // get complete() {
  //   // return true
  //   return (this.count > 9)
  // }
}

decorate(Store, {
  modelViewer: observable,

  editing: observable,
  startEditing: action,
  stopEditing: action,
  save: action,

  activeHotspot: observable,
  hotspotEditing: observable,
  hotspotIsNew: computed,
  startHotspotEditing: action,
  temporaryHotspot: observable,
  saveTemporaryHotspot: action

  // complete: computed
});

export const store = new Store();

const generateUuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}