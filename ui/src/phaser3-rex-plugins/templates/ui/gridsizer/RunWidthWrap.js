// Default method
var RunWidthWrap = function (width) {
    var child, childWidth;
    var colWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runWidthWrap)
        ) {
            continue;
        }

        colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
        childWidth = this.getExpandedChildWidth(child, colWidth);
        if (child.isRexSizer) {
            childWidth = child.resolveWidth(childWidth);
        }
        child.runWidthWrap(childWidth);
    }
    return this;
}

export default RunWidthWrap;