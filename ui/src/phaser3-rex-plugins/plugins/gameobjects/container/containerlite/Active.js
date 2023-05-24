import GetLocalState from './utils/GetLocalState.js';

export default {
    updateChildActive(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        child.active = parent.active && localState.active;
        return this;
    },

    syncActive() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildActive, this);
        }
        return this;
    },
    
    resetChildActiveState(child) {
        var localState = GetLocalState(child);
        localState.active = child.active;
        return this;
    },

    setChildActive(child, active) {
        child.active = active;
        this.resetChildActiveState(child);
        return this;
    },

    setChildLocalActive(child, active) {
        if (active === undefined) {
            active = true;
        }
        var localState = GetLocalState(child);
        localState.active = active;
        this.updateChildActive(child);
        return this;
    },

    resetLocalActiveState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildActiveState(this);
        }
        return this;
    }
};