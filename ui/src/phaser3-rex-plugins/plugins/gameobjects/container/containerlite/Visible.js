/*

Visible in localState:

  - visible: original visible of child
  - maskVisible: invisible by parent mask, see MaskChildren.js
      - undefined (not in masking) : Equal to mask visible
      - true (mask visible) : Inside, or across parent's visible area
      - false (maske invisible) : Out of parent's visible area

Visible result of child = (parent visible) && (child visible) && (mask visible)
*/

import GetLocalState from './utils/GetLocalState.js';

export default {
    updateChildVisible(child) {
        var localState = GetLocalState(child);
        var parent = localState.parent;
        var maskVisible = (localState.hasOwnProperty('maskVisible')) ? localState.maskVisible : true;
        child.visible = parent.visible && localState.visible && maskVisible;
        return this;
    },

    syncVisible() {
        if (this.syncChildrenEnable) {
            this.children.forEach(this.updateChildVisible, this);
        }
        return this;
    },

    resetChildVisibleState(child) {
        var localState = GetLocalState(child);
        // Delete maskVisible property
        if (localState.hasOwnProperty('maskVisible')) {
            delete localState.maskVisible;
        }
        localState.visible = child.visible;
        return this;
    },

    setChildVisible(child, visible) {
        // Visible of child will be affect by parent's visible, and mask visible
        this.setChildLocalVisible(child, visible);
        return this;
    },

    // Internal method
    setChildLocalVisible(child, visible) {
        if (visible === undefined) {
            visible = true;
        }
        var localState = GetLocalState(child);
        localState.visible = visible;
        this.updateChildVisible(child);
        return this;
    },

    // Internal method
    setChildMaskVisible(child, visible) {
        if (visible === undefined) {
            visible = true;
        }
        var localState = GetLocalState(child);
        localState.maskVisible = visible;
        this.updateChildVisible(child);
        return this;
    },

    resetLocalVisibleState() {
        var parent = GetLocalState(this).parent;
        if (parent) {
            parent.resetChildVisibleState(this);
        }
        return this;
    }
};