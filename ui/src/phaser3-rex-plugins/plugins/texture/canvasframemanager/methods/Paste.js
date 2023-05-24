var Paste = function (frameName, gameObject) {
    var srcCanvas = gameObject.canvas;
    if (!srcCanvas) {
        console.warn(`Can't get canvas of game object.`);
        return this;
    }

    var srcWidth = srcCanvas.width,
        srcHeight = srcCanvas.height;
    var dWidth, dHeight;
    if ((srcWidth <= this.cellWidth) && (srcHeight <= this.cellHeight)) {
        dWidth = srcWidth;
        dHeight = srcHeight;
    } else {
        // Scale down and keep ratio
        var scale = Math.max((srcWidth / this.cellWidth), (srcHeight / this.cellHeight));
        dWidth = srcWidth / scale;
        dHeight = srcHeight / scale;
    }
    this.draw(frameName, function (canvas, context, frameSize) {
        context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);

        frameSize.width = dWidth;
        frameSize.height = dHeight;
    })

    return this;
}

export default Paste;