import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildScale(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        if (state.syncScale) {
            child.scaleX = parent.scaleX * state.scaleX;
            child.scaleY = parent.scaleY * state.scaleY;
        }
        return this;
    },

    syncScale() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildScale, this);
        }
        return this;
    },

    resetChildScaleState(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.scaleX = GetScale(child.scaleX, parent.scaleX);
        state.scaleY = GetScale(child.scaleY, parent.scaleY);
        return this;
    },

    setChildScale(child, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        child.scaleX = scaleX;
        child.scaleY = scaleY;
        this.resetChildScaleState(child);
        return this;
    },

    setChildLocalScale(child, scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        var state = GetLocalState(child);
        state.scaleX = scaleX;
        state.scaleY = scaleY;
        this.updateChildScale(child);
        return this;
    },

    setChildDisplaySize(child, width, height) {
        child.setDisplaySize(width, height);
        this.resetChildScaleState(child);
        return this;
    },

    resetLocalScaleState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildScaleState(this);
        }
        return this;
    },
}