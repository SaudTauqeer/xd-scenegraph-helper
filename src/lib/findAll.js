const scenegraph = require("scenegraph");
/**
 * Searches this entire subtree (this node's children, its children's children, etc). Returns all nodes for which callback returns true.
 * Nodes are included in back-to-front order. Parents always appear before their children, and children appear in same relative order before their children, and children appear in same relative order as in the children array.
 * This traversal method is known as "pre-order traversal".
 *
 * @param {Scenenode.isContainer} targetNode targetNode which is type of scenenode.isContainer. if non container node is passed it will be simply returned.
 * @param {Function} callback A function that evaluates whether to return the provided node. If this argument is omitted, findAll returns all nodes in the subtree.
 * @returns {Array} this function returns an array with scenenodes or an empty array if no scenenodes passed the test.
 */

function findAll(targetNode, callback) {
  //wether to test nodes on all levels against the callback or not.
  const isCallbackExists = typeof arguments[1] === "function" ? true : false;
  //handle exceptions.
  if (
    typeof arguments[1] !== "function" &&
    typeof arguments[1] !== typeof undefined
  ) {
    throw `argument 'callback' in function findAll expected 'Function' but got ${typeof callback} `;
  }
  if (targetNode == undefined) {
    throw `argument 'targetNode' in function findAll expected 'Scenenode.isContainer' scenenode but got '${typeof targetNode}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  if (!targetNode.isContainer) {
    throw `argument 'targetNode' in function findAll expected 'Scenenode.isContainer' scenenode but got '${targetNode.constructor.name}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }

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
exports.findAll = findAll;
