function findAll(targetNode, callback) {
  //wether to test nodes on all levels against the callback or not.
  const isCallbackExists = typeof arguments[1] === "function" ? true : false;
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
  function sortContainerAndNonContainerNodes(targetNode) {
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
        childrenAccordingToXdIndex: [],
      }
    );
    const {
      containerNodes,
      nonContainerNodes,
      childrenAccordingToXdIndex,
    } = reducedObject;

    return { containerNodes, nonContainerNodes, childrenAccordingToXdIndex };
  }

  //init the process and send to flatContainerNode

  function startSorting(targetNode) {
    let resultArr = [];
    //get sorted out data.

    const {
      containerNodes,
      nonContainerNodes,
      childrenAccordingToXdIndex,
    } = sortContainerAndNonContainerNodes(targetNode);

    const d = childrenAccordingToXdIndex.map((node) => {
      const bool = isCallbackExists === true ? callback(currentNode) : true;
      //container
      if (containerNodes.includes(node) && bool) {
        // flat node recursively
        const flatData = flatContainerNode(node);
      }
      //non container
      if (nonContainerNodes.includes(node) && bool) {
        resultArr.push(node);
      }
    });
  }
  startSorting(targetNode);

  //flat container node and return result.
  function flatContainerNode(targetNode, results = [], nestedContainers = []) {
    const bool = isCallbackExists ? callback(targetNode) : true;
    //if the target node passes the callback test.
    if (bool && !results.includes(targetNode)) {
      results.push(targetNode);
    }

    //end of iteration?
    if (targetNode === typeof undefined) {
      return results;
    }
    //check for .children.
    if (targetNode.isContainer) {
      const children = targetNode.children;
      if (children.length) {
        children.forEach((child) => {
          const childBool = isCallbackExists ? callback(child) : true;

          //push nested containers so we can keep the sequence right.
          if (child.isContainer) {
            //check if node should be included in result array.
            if (childBool && !results.includes(child)) results.push(child);
            nestedContainers.push(child);
          }
          if (!child.isContainer && bool) {
            console.log(child);
            results.push(child);
          }
        });
      }

      //flat nested container nodes.
      if (nestedContainers.length) {
        //remove node that has been already passed.
        const nextTargetNode = nestedContainers.shift();

        flatContainerNode(nextTargetNode, results, nestedContainers);
      }
    }
    if (!targetNode.isContainer) {
      results.push(targetNode);
    }

    const r = results.map((e) => e.name);
    console.log("****************", r, "***************");
    return results;
  }
}
exports.findAll = findAll;
