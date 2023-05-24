var GetExpandedChildWidth = function (child, parentWidth) {
    if (parentWidth === undefined) {
        parentWidth = this.width;
    }

    var childWidth;
    var childConfig = child.rexSizer;    
    if (childConfig.expandWidth) {        
        var innerWidth = parentWidth - this.space.left - this.space.right;
        var padding = childConfig.padding;
        childWidth = innerWidth - padding.left - padding.right;
    }
    return childWidth;
}

export default GetExpandedChildWidth;