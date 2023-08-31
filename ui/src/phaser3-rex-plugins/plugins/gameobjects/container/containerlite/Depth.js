import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';

export default {
    setDepth(value, containerOnly) {
        this.depth = value;
        if (!containerOnly && this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth = value;
            }
        }
        return this;
    },

    swapDepth(containerB) {
        var depthA = this.depth;
        var depthB = containerB.depth;
        this.setDepth(depthB);
        containerB.setDepth(depthA);
        return this;
    },

    incDepth(inc) {
        this.depth += inc;
        if (this.children) {
            var children = this.getAllChildren();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].depth += inc;
            }
        }
        return this;
    },

    bringToTop() {
        var displayList = this.displayList;
        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, false);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.bringToTop(child);
            }
        }
        return this;
    },

    moveDepthBelow(gameObject) {
        var displayList = this.displayList;
        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, false);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.moveBelow(gameObject, child);
                break;
            }
        }
        return this;
    },

    moveDepthAbove(gameObject) {
        var displayList = this.displayList;
        if (gameObject.displayList !== displayList) {
            // Do nothing if not at the same display list
            return this;
        }

        var children = this.getAllChildren([this]);
        SortGameObjectsByDepth(children, true);
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (displayList.exists(child)) {
                displayList.moveAbove(gameObject, child);
                break;
            }
        }
        return this;
    },

};