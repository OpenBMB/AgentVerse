import { GetParent } from './GetParent.js';
import { DepthFirstSearch, BreadthFirstSearch } from './utils/Traversal.js';

const ArrayUtils = Phaser.Utils.Array;

export default {
    getChildren(out) {
        if (!out) {
            out = this.children; // Return internal children array
        } else {
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                out.push(this.children[i]);
            }
            // Copy children
        }
        return out;
    },

    getAllChildren(out) {
        if (out === undefined) {
            out = [];
        }

        var root = this;
        BreadthFirstSearch(root, function (child) {
            // Don't add root
            if (child === root) {
                return;
            }
            out.push(child);
        });

        return out;
    },

    getAllVisibleChildren(out) {
        if (out === undefined) {
            out = [];
        }

        var root = this;
        BreadthFirstSearch(root, function (child) {
            // Don't add root
            if (child === root) {
                return;
            }
            // Don't add invisible child
            if (!child.visible) {
                return true;
            }
            out.push(child);
        });

        return out;
    },

    bfs(callback, root) {
        if (root === undefined) {
            root = this;
        }
        BreadthFirstSearch(root, callback);
        return this;
    },

    dfs(callback, root) {
        if (root === undefined) {
            root = this;
        }
        DepthFirstSearch(root, callback);
        return this;
    },

    contains(gameObject) { // Override Base.contains method
        var parent = GetParent(gameObject);
        if (!parent) {
            return false;
        } else if (parent === this) {
            return true;
        } else {
            return this.contains(parent);
        }
    },

    getByName(name, recursive) {
        if (!recursive) {
            return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found

        } else { // recursive
            // Breadth-first search
            var queue = [this];
            var parent, child;
            while (queue.length) {
                parent = queue.shift();

                for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
                    child = parent.children[i];
                    if (child.name === name) {
                        return child;
                    } else if (child.isRexContainerLite) {
                        queue.push(child);
                    }
                }
            }
            return null;

        }

    },

    getRandom(startIndex, length) {
        return ArrayUtils.GetRandom(this.children, startIndex, length);
    },

    getFirst(property, value, startIndex, endIndex) {
        return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
    },

    getAll(property, value, startIndex, endIndex) {
        return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
    },

    count(property, value, startIndex, endIndex) {
        return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
    },

    swap(child1, child2) {
        ArrayUtils.Swap(this.children, child1, child2);
        return this;
    },

    setAll(property, value, startIndex, endIndex) {
        ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
        return this;
    },
};