var ResolveWidth = function (width) {
    if (width === undefined) {
        width = Math.max(this.childrenWidth, this.minWidth);
    } else {
        /*
        var minWidth = Math.max(this.childrenWidth, this.minWidth);
        if (minWidth > width) {
            // Warning
        }
        */
    }

    return width;
}

export default ResolveWidth;