const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

var FrameMatrix = new TransformMatrix();

var WebglRender = function (pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - dx,
        y = this.y - dy;

    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
        x += width - (displayOriginX * 2);
        flipX = -1;
    }
    if (this.flipY) {
        y += height - (displayOriginY * 2);
        flipY = -1;
    }

    FrameMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
    calcMatrix.multiply(FrameMatrix, FrameMatrix);

    var tx = -displayOriginX;
    var ty = -displayOriginY;
    var tw = tx + width;
    var th = ty + height;

    var quad = FrameMatrix.setQuad(tx, ty, tw, th, roundPixels);

    var u0 = this.frame.u0;
    var v0 = this.frame.v0;
    var u1 = this.frame.u1;
    var v1 = this.frame.v1;

    var tint = GetTint(this.tint, this.alpha * alpha);

    pipeline.batchQuad(
        this.parent,
        quad[0], quad[1], quad[2], quad[3], quad[4], quad[5], quad[6], quad[7],
        u0, v0,
        u1, v1,
        tint, tint, tint, tint,
        this.tintFill,
        texture,
        textureUnit
    );
}

export default WebglRender;