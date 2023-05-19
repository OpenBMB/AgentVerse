var Draw = function (frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
        index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
        console.warn('Does not have free space.');
        return this;
    }

    var tl = this.getTopLeftPosition(index);
    var frameSize = {
        width: this.cellWidth,
        height: this.cellHeight
    }

    var context = this.context;
    context.save();
    context.translate(tl.x, tl.y);
    context.clearRect(0, 0, frameSize.width, frameSize.height);

    if (scope) {
        callback.call(scope, this.canvas, context, frameSize);
    } else {
        callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();

    this.texture.add(frameName, 0, tl.x, tl.y, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);

    return this;
}

export default Draw;