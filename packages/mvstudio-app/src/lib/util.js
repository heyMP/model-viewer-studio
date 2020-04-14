export const findAllDeep = (parent, selectors, depth = null) => {
  let nodes = [];
  let currentDepth = 1;
  const recursiveSeek = _parent => {
    // record the nodes
    for (let child of _parent.assignedNodes({ flatten: true })) {
      // check if the current node matches the selector
      if (child.matches) {
        if (child.matches(selectors)) {
          nodes = [...nodes, child];
        }
      }
      // if it is a legit element
      if (child.querySelector) {
        // save the found nodes and keep moving
        const foundItems = child.querySelectorAll(selectors);
        nodes = [...nodes, ...foundItems];
        // now loop of each of the found see if we can sniff out more slots
        if (depth && currentDepth < depth) {
          for (slot of child.querySelectorAll('slot')) {
            recursiveSeek(slot);
          }
        }
      }
    }
  };
  recursiveSeek(parent);
  return nodes;
};
