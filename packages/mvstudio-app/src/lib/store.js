import {
  observable,
  decorate,
  computed,
  action,
  autorun,
  toJS
} from "mobx";

export const STATES = {
  INITIAL: 'initial',
  EDIT: 'edit'
}

const generateUuid = () => "xxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const deconstructHotspotElement = node => {
  const id = node.getAttribute("slot");
  const {position} = node.dataset;
  const {normal} = node.dataset;
  const target = node;
  const annotationNode = node.querySelector("*");
  const annotation = annotationNode ? annotationNode.innerText : "";
  return { id, position, normal, target, annotation };
};

const newHostspot = () => ({
    id: `hotspot-${generateUuid()}`,
    position: "",
    normal: "",
    annotation: "",
    target: null,
    new: true
  });

class Store {
  constructor() {
    this.hotspots = []
    this.modelViewer = null;
    this.editing = false;
    this.saving = false;
    this.connected = false;
    this.temporaryHotspot = null;
    this.hotspotEditing = false;
    this.hotspotVisiblilityDefault = false;
    this.endpoint = `localhost:3000`;
    this.location = null;
    this.connect();
  }

  connect() {
    fetch(`${this.endpoint}/ping`).then(res => {
      this.connected = true;
    });
  }

  startEditing() {
    this.editing = true;
  }

  stopEditing() {
    this.editing = false;
    this.temporaryHotspot = null;
  }

  cancel() {
    this.editing = false;
    this.temporaryHotspot = null;
  }

  save() {
    this.saving = true;
    // take snapshot of entire model and save it.
    const snapshot = this.modelViewer.outerHTML;
    let queryParams = []
    if (this.location) {
      queryParams = [...queryParams, `location=${this.location}`]
    }
    fetch(`//${this.endpoint}/save?${queryParams.join('&')}`, {
      method: "POST",
      body: snapshot
    }).then(res => {
      console.log('res:', res)
      this.editing = false;
      this.saving = false;
    }).catch(res => {
    console.log('catch:', res)
    });
  }

  startHotspotEditing() {
    this.hotspotEditing = true;
    // create a new temporary hotspot to edit.
  }

  editHotspot(node) {
    // get current information
    this.editing = true;
    this.temporaryHotspot = deconstructHotspotElement(node);
  }

  deleteHotspot(hotspot = null) {
    const _hotspot = hotspot || this.temporaryHotspot;
    console.log('_hotspot:', toJS(_hotspot))
    const confirmed = confirm(
      `Are you sure you want to delete ${_hotspot.target.id}?`
    );
    if (confirmed) {
      _hotspot.target.remove();
      this.temporaryHotspot = null;
    }
  }

  updateHotspotPositions({ position, normal }) {
    this.hotspotEditing = false;
    this.activeHotspot.position = position;
    this.activeHotspot.normal = normal;
  }

  updateTemporaryHotspot(position) {
    // make sure we have a temporaryHotspot to work with
    if (store.temporaryHotspot === null) {
      store.temporaryHotspot = newHostspot();
    }
    const slotName = `hotspot-${generateUuid()}`;
    const hotspot = `
      <button
        slot="${slotName}"
        data-position="${position.position.toString()}"
        data-normal="${position.normal.toString()}"
        data-visibility-attribute="visible"
      >
    `;
    this.modelViewer.insertAdjacentHTML("beforeend", hotspot);
    const node = this.modelViewer.querySelector(`[slot="${slotName}"]`);
    // remove the old hotspot from DOM
    if (this.temporaryHotspot.target) {
      this.temporaryHotspot.target.remove();
    }
    // store this as a temporary hotspot
    this.temporaryHotspot.target = node;
    this.temporaryHotspot.position = `${position.position.x} ${position.position.y} ${position.position.z}`;
    this.temporaryHotspot.normal = `${position.normal.x} ${position.normal.y} ${position.normal.z}`;
    // insert the hotspot into the DOM
  }

  saveTemporaryHotspot() {
    if (store.temporaryHotspot.target) {
      this.editing = false;
    }
  }

  get hotspotIsNew() {
    return this.hotspotIsNew.new === true;
  }

  storeRawHotspots(hotspots) {
    this.hotspots = hotspots.map(i => ({ target: i, hidden: this.hotspotVisiblilityDefault }))
  }

  toggleHotspotsOn() {
    this.hotspots = this.hotspots.map(i => {
      i.hidden = false;
      return i
    });
  }

  toggleHotspotsOff() {
    this.hotspots = this.hotspots.map(i => {
      i.hidden = true;
      return i
    });
  }

  get state() {
    console.log(this.editing)
    if (this.editing) {
      return STATES.EDIT;
    }
    return STATES.INITIAL;
  }
}

decorate(Store, {
  hotspots: observable,
  storeRawHotspots: action,
  toggleHotspotsOn: action,
  toggleHotspotsOff: action,
  modelViewer: observable,
  hotspotVisiblilityDefault: observable,
  location: observable,

  editing: observable,
  saving: observable,
  connected: observable,

  startEditing: action,
  stopEditing: action,
  save: action,

  activeHotspot: observable,
  hotspotEditing: observable,
  hotspotIsNew: computed,
  startHotspotEditing: action,
  temporaryHotspot: observable,
  saveTemporaryHotspot: action,
  deleteHotspot: action,
  editHotspot: action,

  state: computed
})

export const store = new Store()
window.store = store;

autorun(() => {

  console.table({ store: toJS(store), state: store.state });
  console.log({ temporaryHotspot: toJS(store.temporaryHotspot) })

  store.hotspots.forEach(hotspot => {
    hotspot.target.hidden = hotspot.hidden;
  });

  if (
    store.temporaryHotspot &&
    store.temporaryHotspot.target &&
    store.temporaryHotspot.id
  ) {
    // update id
    store.temporaryHotspot.target.id = store.temporaryHotspot.id;
  }
  if (store.temporaryHotspot && store.temporaryHotspot.target) {
    if (store.temporaryHotspot.annotation) {
      // get the current state of the annotation you
      const currentAnnotation = store.temporaryHotspot.target.querySelector(
        "*"
      );
      if (!currentAnnotation) {
        const element = document.createElement("div");
        element.id = "annotation";
        element.innerHTML = store.temporaryHotspot.annotation;
        store.temporaryHotspot.target.appendChild(element);
      } else {
        currentAnnotation.innerHTML = store.temporaryHotspot.annotation;
      }
    }
  }
  if (store.modelViewer) {
    store.modelViewer
    const observer = new MutationObserver(((mutations) => {
      // Whether you iterate over mutations..
      mutations.forEach((mutation) => {
      });
    }));
    observer.observe(store.modelViewer, {
      attributes: true,
      childList: false,
      characterData: false,
      characterDataOldValue: false,
      subtree: false
    });
  }
});