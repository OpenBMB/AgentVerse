var CanvasRender = function (ctx, dx, dy, roundPixels) {

    ctx.save();

    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - displayOriginX,
        y = this.y - displayOriginY;

    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
        x += width;
        flipX = -1;
    }
    if (this.flipY) {
        y += height;
        flipY = -1;
    }

    if (roundPixels) {
        x = Math.round(x);
        y = Math.round(y);
    }

    ctx.translate(x, y);

    ctx.rotate(this.rotation);

    ctx.scale(this.scaleX * flipX, this.scaleY * flipY);

    var frame = this.frame;
    ctx.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY, width, height,
        0, 0, width, height,
    );

    ctx.restore();

}
export default CanvasRender;