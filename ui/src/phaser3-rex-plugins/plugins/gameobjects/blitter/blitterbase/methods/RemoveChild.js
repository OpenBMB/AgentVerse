const RemoveItem = Phaser.Utils.Array.Remove;

var RemoveChild = function (bob) {
    if (this.poolManager) {
        // Free this bob (bob.onFree())
        this.poolManager.free(bob);
    }

    // Remove this bob from blitter
    RemoveItem(this.children.list, bob);
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
}

export default RemoveChild;