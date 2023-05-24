import GetLocalState from './utils/GetLocalState.js';

export default {
    enableLayer() {
        if (this.privateRenderLayer) {
            return this;
        }

        var layer = this.scene.add.layer();
        // layer.name = (this.name) ? `${this.name}.privateLayer` : 'privateLayer';

        this.moveDepthBelow(layer);

        this.addToLayer(layer);

        this.privateRenderLayer = layer;

        return this;
    },

    getLayer() {
        if (!this.privateRenderLayer) {
            this.enableLayer();
        }

        return this.privateRenderLayer;
    },

    getRenderLayer() {
        // This containerLite has a layer
        if (this.privateRenderLayer) {
            return this.privateRenderLayer;
        }

        // One of parent container has a layer
        var parent = this.getParent();
        while (parent) {
            var layer = parent.privateRenderLayer;
            if (layer) {
                return layer;
            }
            parent = parent.getParent();
        }

        return null;
    },

    // Internal method for adding child
    addToRenderLayer(gameObject) {
        // Don't add to layer if gameObject is not in any displayList
        if (!gameObject.displayList) {
            return this;
        }

        // Move gameObject from scene to layer
        var layer = this.getRenderLayer();
        if (!layer) {
            return this;
        }

        if (gameObject.isRexContainerLite) {
            // Add containerLite and its children
            gameObject.addToLayer(layer);
        } else {
            // Add gameObject directly
            layer.add(gameObject);
        }

        var state = GetLocalState(gameObject);
        state.layer = layer;

        return this;
    },

    // Internal method for removing child
    removeFromRenderLayer(gameObject) {
        // Move gameObject from layer to scene
        var state = GetLocalState(gameObject);
        var layer = state.layer;
        if (!layer) {
            return this;
        }

        layer.remove(gameObject);
        state.layer = null;

        return this;
    },
}