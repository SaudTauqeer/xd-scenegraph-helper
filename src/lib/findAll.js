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

  const result = flatContainerNode(targetNode);
  console.log(result, "top result");

  //flat container node and return result.
  function flatContainerNode(targetNode, results = [], nestedContainers = []) {
    const isTargetNodeArtboard = targetNode instanceof scenegraph.Artboard;

    const cbBool = isCallbackExists ? callback(targetNode) : true;
    //if the target node passes the callback test.
    if (cbBool && !isTargetNodeArtboard) {
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
          if (!child.isContainer && cbBool) {
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
    const _ = require("lodash");

    const r = _.uniq(results).map((e) => e.name);
    console.log("****************", r, "***************");
    return results;
  }
}
exports.findAll = findAll;
