# xd-scenegraph-helper.

**xd-scenegraph-helper** is a set of **lightweight** helper functions with no **external dependencies** that let's you easily traverse the scenegraph of a XD document. While traversing, these functions will always respect the order of XD document flow. XD's default flow is:
**Nodes are included in back-to-front order**

# Before Installation.

Make sure you have scenengraph correctly exposed to your plugin's code as a dependency. If you're using webpack you can do it by adding this to `webpack.config.js`:

```
externals: {
scenegraph:  "scenegraph",
},

```

# Installation.

You can install this package via npm.

```
npm i xd-scenegraph-helper
// or
yarn add xd-scenegraph-helper
```

# Usage

You can use it in your plugin setup like so:

```
const {findAll, findOne, findChildren, findChild} = require("xd-scenegraph-helper");
```

# API

## findAll

Searches this entire subtree (this node's children, its children's children, etc). Returns all nodes for which `callback` returns true.

## Signature

### findAll (targetNode: SceneNode.isContainer ,callback?: (node: SceneNode) => boolean): ReadonlyArray<[SceneNode]>

## Parameters

### callback

A function that evaluates whether to return the provided `node`. If this argument is omitted, `findAll` returns all nodes in the subtree.

## Remarks

Nodes are included in **back-to-front** order. Parents always appear before their children, and children appear in same relative order before their children, and children appear in same relative order as in the [`children`](<[https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodechildren--scenenodelist](https://adobexdplatform.com/plugin-docs/reference/scenegraph.html#scenenodechildren--scenenodelist)>) array.

This traversal method is known as ["pre-order traversal"](<https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)>).
Example: find all `Rectangle` nodes and all nodes across the tree.

```
const  scenegraph  =  require("scenegraph");
//selected node is an Artboard here.
const  selectedNode =  scenegraph.selection.items[0];
const {findAll} = require("xd-scenegraph-helper");
//for getting all nodes across the tree.
const allNodesInTree = findAll(selectedNode);
//for getting specific nodes across the tree.
const rectangles = findAll(selectedNode, (node)=> node instanceof scenegraph.Rectangle)
```

## findOne

Searches this entire subtree (this node's children, its children's children, etc). Returns the first node for which `callback` returns true.

## Signature

### findOne (targetNode: SceneNode.isContainer ,callback?: (node: SceneNode) => boolean): Scenenode | null

## Parameters

### callback

A function that evaluates whether to return the provided `node`.

## Remarks

This function returns `null` if no matching node is found. The traversal order is the same as in `findAll`.
Example:

```
const  scenegraph  =  require("scenegraph");
//selected node is an Artboard here.
const  selectedNode =  scenegraph.selection.items[0];
const {findOne} = require("xd-scenegraph-helper");
//for getting specific a node across the tree.
const rectangle = findOne(selectedNode, (node)=> node instanceof scenegraph.Rectangle)
```

## findChild

Searches the immediate children of this node (i.e. not including the children's children). Returns the first node for which `callback` returns true.

## Signature

### findChild (targetNode: SceneNode.isContainer, callback?: (node: SceneNode) => boolean): Scenenode | null

## Parameters

### callback

A function that evaluates whether to return the provided `node`.

## Remarks

This function returns `null` if no matching node is found.
Example: find `Group` node whose is a immediate child of the targetNode.

```
const  scenegraph  =  require("scenegraph");
//selected node is an Artboard here.
const  selectedNode =  scenegraph.selection.items[0];
const {findChild} = require("xd-scenegraph-helper");
//for getting specific immediate child.
const rectangle = findChild(selectedNode,(node)=> node instanceof scenegraph.Group)
```

## findChildren

Searches the immediate children of this node (i.e. not including the children's children). Returns all nodes for which `callback` returns true.

## Signature

### findChildren (targetNode: SceneNode.isContainer, callback?: (node: SceneNode) => boolean): ReadonlyArray<[SceneNode]>

## Parameters

### callback

A function that evaluates whether to return the provided `node`. If this argument is omitted, `findChildren` returns `node.children`.

## Remarks

Example: find all `Group` nodes who are immediate child of the targetNode.

```
const  scenegraph  =  require("scenegraph");
//selected node is an Artboard here.
const  selectedNode =  scenegraph.selection.items[0];
const {findChildren} = require("xd-scenegraph-helper");
//for getting specific immediate children.
const groups = findChild(selectedNode,(node)=> node instanceof scenegraph.Group)
```

# Authors

- Saud Tauqeer <saudtauqeer381@gmail.com>

# License

MIT

# Acknowledgments

**xd-scenegraph-herlper** is heavily inspired by figma's API implementation.

# Issues

Feel free to open an issue or submit a PR (please include isolated reproducible code) and i'll take a look at it as soon as humanly possible.
