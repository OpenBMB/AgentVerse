var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    for (var key in children) {
        child = children[key];

        padding = child.rexSizer.padding;
        childWidth = this.getChildWidth(child) + padding.left + padding.right;
        result = Math.max(childWidth, result);
    }
    return result + this.space.left + this.space.right;
}

export default GetChildrenWidth;