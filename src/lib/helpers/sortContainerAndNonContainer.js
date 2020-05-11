/**
     * Sorts a parent node into container and non-container nodes, also returns nodes according to XD index which is bottom-most node first.
     * @param {scenenode.isContainer} targetNode parent node that is going to be sorted.
     * @returns {Object} this function returns object:
     * {
          containerNodes: [],
          nonContainerNodes: [],
          childrenAccordingToXdIndex: []
        }
     *
     */
function sortContainerAndNonContainer(targetNode) {
  const isTargetNodeArtboard = targetNode instanceof scenegraph.Artboard;
  const initiatorArr = isTargetNodeArtboard ? [] : [targetNode];

  const children = targetNode.children;
  //now we can use reduce on these children.
  const iterableChildrenArray = children.map((e) => e);
  //seperate container and non-container nodes.
  const reducedObject = iterableChildrenArray.reduce(
    (acc, currentNode, index) => {
      //set bool var to true if no callback exists otherwise use callbacks bool value.
      const bool = isCallbackExists === true ? callback(currentNode) : true;

      acc.childrenAccordingToXdIndex.push(currentNode);
      if (currentNode.isContainer && bool) {
        acc.containerNodes.push(currentNode);
      }
      if (!currentNode.isContainer && bool) {
        acc.nonContainerNodes.push(currentNode);
      }
      return acc;
    },
    {
      containerNodes: [],
      nonContainerNodes: [],
      childrenAccordingToXdIndex: initiatorArr,
    }
  );
  const {
    containerNodes,
    nonContainerNodes,
    childrenAccordingToXdIndex,
  } = reducedObject;

  return { containerNodes, nonContainerNodes, childrenAccordingToXdIndex };
}

exports.sortContainerAndNonContainer = sortContainerAndNonContainer;
