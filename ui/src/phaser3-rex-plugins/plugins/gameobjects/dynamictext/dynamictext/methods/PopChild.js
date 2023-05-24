const RemoveItem = Phaser.Utils.Array.Remove;

var PopChild = function (child) {
    RemoveItem(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
}

export default PopChild;