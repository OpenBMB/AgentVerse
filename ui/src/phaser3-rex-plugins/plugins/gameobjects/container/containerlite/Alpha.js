import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildAlpha(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        if (state.syncAlpha) {
            child.alpha = parent.alpha * state.alpha;
        }
        return this;
    },

    syncAlpha() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildAlpha, this);
        }
        return this;
    },

    resetChildAlphaState(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.alpha = GetScale(child.alpha, parent.alpha);
        return this;
    },

    setChildAlpha(child, alpha) {
        child.alpha = alpha;
        this.resetChildAlphaState(child);
        return this;
    },

    setChildLocalAlpha(child, alpha) {
        var state = GetLocalState(child);
        state.alpha = alpha;
        this.updateChildAlpha(child);
        return this;
    },

    resetLocalAlphaState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildAlphaState(this);
        }
        return this;
    }
};