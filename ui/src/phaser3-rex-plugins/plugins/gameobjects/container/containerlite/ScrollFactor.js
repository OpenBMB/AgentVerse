import GetLocalState from './utils/GetLocalState.js';

export default {
    updateChildScrollFactor(child) {
        var state = GetLocalState(child);
        var parent = state.parent;

        if (state.syncScrollFactor) {
            child.setScrollFactor(parent.scrollFactorX, parent.scrollFactorY);
        }

        return this;
    },

    syncScrollFactor() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildScrollFactor, this);
        }
        return this;
    },

};