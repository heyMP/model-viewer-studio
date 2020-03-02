import {
  observable,
  decorate,
  computed,
  action,
  autorun
} from "../web_modules/mobx.js";

const generateUuid = () => {
  return "xxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const deconstructHotspotElement = node => {
  const id = node.getAttribute("slot");
  const position = node.dataset.position;
  const normal = node.dataset.normal;
  const reference = node;
  let annotationNode = node.querySelector("*");
  const annotation = annotationNode ? annotationNode.innerText : "";
  return { id, position, normal, reference, annotation };
};

const newHostspot = () => {
  return {
    id: `hotspot-${generateUuid()}`,
    position: "",
    normal: "",
    annotation: "",
    reference: null,
    new: true
  };
};

class Store {
  constructor() {
    this.modelViewer = null;
    this.editing = false;
    this.saving = true;
    this.connected = false;
    this.temporaryHotspot = null;
    this.hotspotEditing = false;
    this.connect();
  }

  connect() {
    fetch("http://localhost:3000/ping").then(res => {
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

  save() {
    this.saving = true;
    // take snapshot of entire model and save it.
    const snapshot = this.modelViewer.outerHTML;
    fetch("http://localhost:3000/save", {
      method: "POST",
      body: snapshot
    }).then(res => {
      this.editing = false;
      this.saving = false;
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

  deleteHotspot() {
    if (this.temporaryHotspot.reference) {
      const confirmed = confirm(
        `Are you sure you want to delete ${this.temporaryHotspot.id}?`
      );
      if (confirmed) {
        this.temporaryHotspot.reference.remove();
        this.temporaryHotspot = null;
      }
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
    let hotspot = `
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
    if (this.temporaryHotspot.reference) {
      this.temporaryHotspot.reference.remove();
    }
    // store this as a temporary hotspot
    this.temporaryHotspot.reference = node;
    this.temporaryHotspot.position = `${position.position.x} ${position.position.y} ${position.position.z}`;
    this.temporaryHotspot.normal = `${position.normal.x} ${position.normal.y} ${position.normal.z}`;
    // insert the hotspot into the DOM
  }

  saveTemporaryHotspot() {
    if (store.temporaryHotspot.reference) {
      this.editing = false;
    }
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
  editHotspot: action

  // complete: computed
});

export const store = new Store();

autorun(() => {
  if (
    store.temporaryHotspot &&
    store.temporaryHotspot.reference &&
    store.temporaryHotspot.id
  ) {
    // update id
    store.temporaryHotspot.reference.id = store.temporaryHotspot.id;
  }
  if (store.temporaryHotspot && store.temporaryHotspot.reference) {
    if (store.temporaryHotspot.annotation) {
      // get the current state of the annotation you
      const currentAnnotation = store.temporaryHotspot.reference.querySelector(
        "*"
      );
      if (!currentAnnotation) {
        let element = document.createElement("div");
        element.id = "annotation";
        element.innerHTML = store.temporaryHotspot.annotation;
        store.temporaryHotspot.reference.appendChild(element);
      } else {
        currentAnnotation.innerHTML = store.temporaryHotspot.annotation;
      }
    }
  }
  if (store.modelViewer) {
    store.modelViewer
    var observer = new MutationObserver(function (mutations) {
      // Whether you iterate over mutations..
      mutations.forEach(function (mutation) {
      });
    });
    observer.observe(store.modelViewer, {
      attributes: true,
      childList: false,
      characterData: false,
      characterDataOldValue: false,
      subtree: false
    });
  }
});
