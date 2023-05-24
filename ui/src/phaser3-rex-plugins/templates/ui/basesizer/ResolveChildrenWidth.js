var ResolveChildrenWidth = function (parentWidth) {
    // Resolve width of sizer children
    var child, childWidth;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child && child.isRexSizer && !child.ignoreLayout) {
            childWidth = this.getExpandedChildWidth(child, parentWidth);
            childWidth = child.resolveWidth(childWidth);
            child.resolveChildrenWidth(childWidth);
        }
    }
}

export default ResolveChildrenWidth;