import GetLocalState from './utils/GetLocalState.js';

const DegToRad = Phaser.Math.DegToRad;

export default {
    updateChildRotation(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        if (state.syncRotation) {
            child.rotation = parent.rotation + state.rotation;
        }
        return this;
    },

    syncRotation() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildRotation, this);
        }
        return this;
    },

    resetChildRotationState(child) {
        var state = GetLocalState(child);
        var parent = state.parent;
        state.rotation = child.rotation - parent.rotation;
        return this;
    },

    setChildRotation(child, rotation) {
        child.rotation = rotation;
        this.resetChildRotationState(child);
        return this;
    },

    setChildAngle(child, angle) {
        child.angle = angle;
        this.resetChildRotationState(child);
        return this;
    },

    setChildLocalRotation(child, rotation) {
        var state = GetLocalState(child);
        state.rotation = rotation;
        this.updateChildRotation(child);
        return this;
    },

    setChildLocalAngle(child, angle) {
        var state = GetLocalState(child);
        state.rotation = DegToRad(angle);
        this.updateChildRotation(child);
        return this;
    },

    resetLocalRotationState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildRotationState(this);
        }
        return this;
    },
}