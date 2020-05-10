/**
 *
 * Searches the immediate children of the targetNode (i.e. not including the children's children). Returns all nodes for which callback returns true.
 * @param {Scenenode.isContainer} targetNode target scenenode which contains .children property.
 * @param {Function} callback  function that evaluates whether to return the provided node. If this argument is omitted, findChildren returns node.children.
 * @returns this function returns empty or populated array depending on if matching nodes were found or not.
 */
function findChildren(targetNode, callback) {
  //handle exceptions.
  if (targetNode == undefined) {
    throw `argument targetNode in function findChildren expected 'Scenenode.isContainer' scenenode but got '${typeof targetNode}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  if (!targetNode.isContainer) {
    throw `argument targetNode in function findChildren expected 'Scenenode.isContainer' scenenode but got '${targetNode.constructor.name}' instead. Read more: https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodeiscontainer--boolean`;
  }
  //if callback is omitted.
  if (!arguments[1]) return targetNode.children;
  //filter target node based on callback boolean value.
  return targetNode.children.filter((node) => {
    const boolean = callback(node);
    return boolean;
  });
}
exports.findChildren = findChildren;
