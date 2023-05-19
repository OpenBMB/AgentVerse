var SetFixedSize = function (width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }

    var dirty = (this.fixedWidth !== width) || (this.fixedHeight !== height);
    if (!dirty) {
        return this;
    }

    this.fixedWidth = width;
    this.fixedHeight = height;
    this.dirty = true;

    this.setCanvasSize(
        (width > 0) ? width : this.width,
        (height > 0) ? height : this.height
    );

    return this;
}

export default SetFixedSize;