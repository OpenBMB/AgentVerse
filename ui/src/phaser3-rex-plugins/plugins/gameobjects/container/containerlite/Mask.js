export default {
    updateChildMask(child) {
        // Don't propagate null mask to clear children's mask
        if (this.mask == null) {
            return this;
        }

        var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
        if (maskGameObject !== child) {
            child.mask = this.mask;
        }
        return this;
    },

    syncMask() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildMask, this);
        }
        return this;
    },

    setMask(mask) {
        this.mask = mask;
        return this;
    },

    clearMask(destroyMask) {
        if (destroyMask === undefined) {
            destroyMask = false;
        }

        // Clear current mask
        this._mask = null;
        // Clear children mask
        this.children.forEach(function (child) {
            child.clearMask(false);
        });

        if (destroyMask && this.mask) {
            this.mask.destroy();
        }
        return this;
    },
};