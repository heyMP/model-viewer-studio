import {
  observable,
  decorate,
  computed,
  action,
  autorun,
  toJS
} from "mobx";

class Store {
  constructor() {
    this.hotspots = []
  }

  storeRawHotspots(hotspots) {
    this.hotspots = hotspots.map(i => {
      i.hidden = true;
      return { target: i, hidden: true }
    })
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
}

decorate(Store, {
  hotspots: observable,
  storeRawHotspots: action,
  toggleHotspotsOn: action,
  toggleHotspotsOff: action
})

export const store = new Store()
window.store = store;

autorun(() => {
  store.hotspots.forEach(hotspot => {
    hotspot.target.hidden = hotspot.hidden;
  });
});