import {
  observable,
  decorate,
  computed,
  action,
  autorun
} from "mobx";

class Store {
  constructor() {
    this.hotspots = []
    this.activeHostpot = null
  }

  activateHotspot(hotspot) {
    this.activeHostpot = hotspot;
  }
}

decorate(Store, {
  hotspots: observable,
  activeHostpot: observable,
  activateHotspot: action
})

export const store = new Store()
window.store = store;

autorun(() => {
  // if (store.hotspots) {
  //   const hiddenHostpots = store.hotspots.filter(i => {
  //     if (store.activeHostpot) {
  //       if (store.activateHotspot.id !== i.id) {
  //         return false;
  //       }
  //     }
  //     return true
  //   })
  //   hiddenHostpots.forEach(i => {
  //     i.hidden = true;
  //   });
  //   if (store.activeHostpot) {
  //     store.activeHostpot.hidden = false;
  //   }
  // }
});

const updateHotspotVisibility = () => {
}