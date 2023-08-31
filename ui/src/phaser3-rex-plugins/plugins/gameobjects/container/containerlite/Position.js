import GetLocalState from './utils/GetLocalState.js';
import GetScale from './utils/GetScale.js';

export default {
    updateChildPosition(child) {
        if (child.isRexContainerLite) {
            child.syncChildrenEnable = false;
        }
        var state = GetLocalState(child);
        var parent = state.parent;

        if (state.syncPosition) {
            child.x = state.x;
            child.y = state.y;
            parent.localToWorld(child);
        }

        if (state.syncRotation) {
            child.rotation = state.rotation + parent.rotation;
        }

        if (state.syncScale) {
            child.scaleX = state.scaleX * parent.scaleX;
            child.scaleY = state.scaleY * parent.scaleY;
        }

        if (child.isRexContainerLite) {
            child.syncChildrenEnable = true;
            child.syncPosition();
        }
        return this;
    },

    syncPosition() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildPosition, this);
        }
        return this;
    },

    resetChildPositionState(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.x = child.x;
        state.y = child.y;
        parent.worldToLocal(state);

        state.scaleX = GetScale(child.scaleX, parent.scaleX);
        state.scaleY = GetScale(child.scaleY, parent.scaleY);

        state.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildPosition(child, x, y) {
        child.x = x;
        child.y = y;
        this.resetChildPositionState(child);
        return this;
    },

    setChildLocalPosition(child, x, y) {
        var state = GetLocalState(child);
        state.x = x;
        state.y = y;
        this.updateChildPosition(child);
        return this;
    },

    resetLocalPositionState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildPositionState(this);
        }
        return this;
    }
};