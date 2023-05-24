var AddEmptyFrame = function (frameName, width, height) {
    if (width === undefined) {
        width = this.cellWidth;
    }
    if (height === undefined) {
        height = this.cellHeight;
    }
    this.draw(frameName, function (canvas, context, frameSize) {
        frameSize.width = width;
        frameSize.height = height;
    })

    return this;
}

export default AddEmptyFrame;