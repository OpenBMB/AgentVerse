var DrawImage = function (key, context, x, y, autoRound) {
    var imgData = this.get(key);
    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

    var width = imgData.width,
        height = imgData.height;
    x += imgData.left - (imgData.originX * width);
    y += imgData.y - (imgData.originY * height);
    if (autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    context.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
        x, y, width, height
    );
}

export default DrawImage;