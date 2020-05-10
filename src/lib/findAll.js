function findAll(targetNode, callback) {
  //handle exceptions.
  if (
    typeof arguments[1] !== "function" &&
    typeof arguments[1] !== typeof undefined
  ) {
    throw `argument callback' in function findChildren expected 'Function' but got ${typeof callback} `;
  }
  if (targetNode == undefined) {
    throw `argument targetNode in function findChildren expected 'Scenenode.isContainer' scenenode but got '${typeof targetNode}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  if (!targetNode.isContainer) {
    throw `argument targetNode in function findChildren expected 'Scenenode.isContainer' scenenode but got '${targetNode.constructor.name}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }

  /**
   * Sorts a parent node into container and non-container nodes.
   * @param {scenenode.isContainer} targetNode parent node that is going to be sorted.
   * @returns {Object} this function returns object:
   * {
        containerNodes: [],
        nonContainerNodes: [],
      }
   *
   */
  function sortContainerAndNonContainerNodes(targetNode) {
    const children = targetNode.children;
    //now we can use reduce on these children.
    const iterableChildrenArray = children.map((e) => e);
    //seperate container and non-container nodes.
    const reducedObject = iterableChildrenArray.reduce(
      (acc, currentNode, index) => {
        if (currentNode.isContainer) {
          acc.containerNodes.push(currentNode);
        }
        if (!currentNode.isContainer) {
          acc.nonContainerNodes.push(currentNode);
        }
        return acc;
      },
      {
        containerNodes: [],
        nonContainerNodes: [],
      }
    );
    const { containerNodes, nonContainerNodes } = reducedObject;
    return { containerNodes, nonContainerNodes };
  }

  function getChildrenRecursively(targetNode) {
    const {
      containerNodes,
      nonContainerNodes,
    } = sortContainerAndNonContainerNodes(targetNode);
    console.log(
      containerNodes,
      "<=====================>",
      nonContainerNodes,
      "last test"
    );
    const parent = [targetNode.children.at(0)];
  }

  getChildrenRecursively(targetNode);
}

exports.findAll = findAll;
