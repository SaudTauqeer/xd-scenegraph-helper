const scenegraph = require("scenegraph");
/**
 *
 * Searches the immediate children of this node (i.e. not including the children's children). Returns the first node for which callback returns true.
 * @param {Scenenode.isContainer} targetNode target scenenode which contains .children property.
 * @param {Function} callback function that evaluates whether to return the provided node.
 * @returns This function returns null or Scenenode depending on if matching node was found or not.
 */

function findChild(targetNode, callback) {
  if (!arguments[1] || typeof arguments[1] !== "function") {
    throw `argument 'callback' in function findChild expected 'Function' but got ${typeof callback} `;
  }
  //handle exceptions.
  if (targetNode == undefined) {
    throw `argument 'targetNode' in function findChild expected 'Scenenode.isContainer' scenenode but got '${typeof targetNode}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  if (!targetNode.isContainer) {
    throw `argument 'targetNode' in function findChild expected 'Scenenode.isContainer' scenenode but got '${targetNode.constructor.name}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }

  //filter target node based on callback boolean value.
  const findableArr = targetNode.children.map((node) => {
    return node;
  });
  //find first occuring instance.
  const child = findableArr.find((n) => callback(n));
  if (child) return child;
  if (!child) return null;
}
exports.findChild = findChild;
