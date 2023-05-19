var GetChildrenHeight = function (minimumMode) {
    if (this.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childHeight;
    if (this.orientation === 0) { // x
        // Get maximun height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer.hidden) {
                continue;
            }

            padding = child.rexSizer.padding;
            childHeight = this.getChildHeight(child) + padding.top + padding.bottom;
            result = Math.max(childHeight, result);
        }
    } else {
        // Get summation of minimum height
        var itemSpace = this.space.item;
        var isFirstChild = true;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            if (child.rexSizer.hidden) {
                continue;
            }

            if ((child.rexSizer.proportion === 0) || minimumMode) {
                childHeight = this.getChildHeight(child);
            } else {
                childHeight = 0;
            }
            padding = child.rexSizer.padding;
            childHeight += (padding.top + padding.bottom);

            if (isFirstChild) {
                isFirstChild = false;
            } else {
                childHeight += itemSpace;
            }

            result += childHeight;
        }
    }
    return result + this.space.top + this.space.bottom;
}

export default GetChildrenHeight;