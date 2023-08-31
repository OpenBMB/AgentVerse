import SortGameObjectsByDepth from '../../../utils/system/SortGameObjectsByDepth.js';

export default {
    addToContainer(p3Container) {
        this._setParentContainerFlag = true;

        var gameObjects = this.getAllChildren([this]);
        SortGameObjectsByDepth(gameObjects);
        p3Container.add(gameObjects);

        this._setParentContainerFlag = false;
        return this;
    },

    addToLayer(layer) {
        this.addToContainer(layer);
        return this;
    },

    removeFromContainer() {
        if (!this.parentContainer) {
            return this;
        }

        // Will add gameObjects to scene
        var gameObjects = this.getAllChildren([this])
            .filter(function (gameObject) {
                return !!gameObject.scene;
            });

        if (gameObjects.length === 0) {
            return this;
        }

        this._setParentContainerFlag = true;

        if (gameObjects.length > 1) {
            SortGameObjectsByDepth(gameObjects);
            gameObjects.reverse();
        }

        this.parentContainer.remove(gameObjects);

        this._setParentContainerFlag = false;
        return this;
    },

    getParentContainer() {
        if (this.parentContainer) {
            return this.parentContainer;
        }

        // One of parent container has a layer
        var parent = this.getParent();
        while (parent) {
            var p3Container = parent.parentContainer;
            if (p3Container) {
                return p3Container;
            }
            parent = parent.getParent();
        }

        return null;
    },

    addToParentContainer(gameObject) {
        // Don't add to layer if gameObject is not in any displayList
        if (!gameObject.displayList) {
            return this;
        }
        var p3Container = this.getParentContainer();
        if (!p3Container) {
            return this;
        }

        if (gameObject.isRexContainerLite) {
            // Add containerLite and its children
            gameObject.addToContainer(p3Container);
        } else {
            // Add gameObject directly
            p3Container.add(gameObject);
        }

        return this;
    }
}