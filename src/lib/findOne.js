/**
 * Searches this entire subtree (this node's children, its children's children, etc).
 * Returns the first node for which callback returns true.
 *
 * @param {Scenenode.isContainer} targetNode targetNode which is type of scenenode.isContainer. if non container node is passed it will be simply returned.
 * @param {Function} callback A function that evaluates whether to return the provided node.
 * @returns {Scenenode} This function returns null if no matching node is found. The traversal order is the same as in findAll.
 */

function findOne(targetNode, callback) {
  //handle exceptions.
  if (typeof arguments[1] !== "function") {
    throw `argument 'callback' in function findOne expected 'Function' but got ${typeof callback} `;
  }
  if (targetNode == undefined) {
    throw `argument 'targetNode in function findOne expected 'Scenenode.isContainer' scenenode but got '${typeof targetNode}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  if (!targetNode.isContainer) {
    throw `argument 'targetNode' in function findOne expected 'Scenenode.isContainer' scenenode but got '${targetNode.constructor.name}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  //get all elements in the tree.
  const allNodesInTree = findAll(targetNode);
  //filter.
  const result = allNodesInTree.find(callback);

  if (result) return result;
  return null;
}

function findAll(targetNode, callback) {
  const result = flatContainerNode(targetNode);
  return result;
  //flat container node and return result.
  function flatContainerNode(targetNode, results = [], nestedContainers = []) {
    const isTargetNodeArtboard = targetNode instanceof scenegraph.Artboard;
    //if the target node passes the callback test.
    if (!isTargetNodeArtboard && !results.includes(targetNode)) {
      if (isCallbackExists) {
        const bool = callback(targetNode);
        if (bool) {
          results.push(targetNode);
        }
      } else {
        results.push(targetNode);
      }
    }
    if (!targetNode.isContainer && !results.includes(targetNode)) {
      if (isCallbackExists) {
        const bool = callback(targetNode);
        if (bool) {
          results.push(targetNode);
        }
      } else {
        results.push(targetNode);
      }
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
          //push nested containers so we can keep the sequence right.
          if (child.isContainer) {
            //check if node should be included in result array.
            if (!results.includes(child)) {
              if (isCallbackExists) {
                const bool = callback(child);
                if (bool) {
                  results.push(child);
                }
              } else {
                results.push(child);
              }
            }
            nestedContainers.push(child);
            //remove node that has been already passed.
            const nextTargetNode = nestedContainers.shift();
            flatContainerNode(nextTargetNode, results, nestedContainers);
          }
          if (!child.isContainer && !results.includes(child)) {
            if (isCallbackExists) {
              const bool = callback(child);
              if (bool) {
                results.push(child);
              }
            } else {
              results.push(child);
            }
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

    return results;
  }
}
exports.findOne = findOne;
