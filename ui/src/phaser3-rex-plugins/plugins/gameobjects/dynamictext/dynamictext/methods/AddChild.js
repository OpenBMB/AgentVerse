// const RemoveItem = Phaser.Utils.Array.Remove;

var AddChild = function (child, index) {
    var areChildren = Array.isArray(child);

    // Remove existed child(s)
    // RemoveItem(this.children, child);

    if ((index === undefined) || (index === this.children.length)) {
        if (areChildren) {
            this.children.push(...child);
        } else {
            this.children.push(child);
        }
    } else {
        if (areChildren) {
            this.children.splice(index, 0, ...child)
        } else {
            this.children.splice(index, 0, child);
        }
    }

    this.lastAppendedChildren.length = 0;
    if (areChildren) {
        this.lastAppendedChildren.push(...child);
    } else {
        this.lastAppendedChildren.push(child);
    }

    return this;
}

export default AddChild;