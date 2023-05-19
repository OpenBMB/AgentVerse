var RemoveChildren = function () {
    if (this.poolManager) {
        // Free all bobs (bob.onFree())
        this.poolManager.freeMultiple(this.children.list);
    }

    // Remove all bobs from blitter
    this.children.list.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
}

export default RemoveChildren;