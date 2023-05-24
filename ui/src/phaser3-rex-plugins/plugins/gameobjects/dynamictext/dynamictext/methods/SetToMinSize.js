var SetToMinSize = function () {
    var children = this.children;
    var maxX = 0,
        maxY = 0;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (!child.renderable || !child.active || !child.visible) {
            continue;
        }

        var x0 = (child.x0 !== undefined) ? child.x0 : child.x;
        var y0 = (child.y0 !== undefined) ? child.y0 : child.y;
        maxX = Math.max(maxX, x0);
        maxY = Math.max(maxY, y0);
    }

    var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
    var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

    // Ignore fixedWidth, and fixedHeight
    if ((this.width !== width) || (this.height !== height)) {
        this.dirty = true;
        this.setCanvasSize(width, height);
    }
    return this;
}

export default SetToMinSize;