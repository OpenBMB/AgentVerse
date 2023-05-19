// copy from Phaser.GameObjects.Text

const Utils = Phaser.Renderer.WebGL.Utils;

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateTexture();
        src.dirty = false;
    }

    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    camera.addToRenderList(src);

    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;
    var pipeline = renderer.pipelines.set(src.pipeline, src);
    var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

    renderer.pipelines.preBatch(src);

    pipeline.batchTexture(
        src,
        frame.glTexture,
        width, height,
        src.x, src.y,
        width / src.resolution, height / src.resolution,
        src.scaleX, src.scaleY,
        src.rotation,
        src.flipX, src.flipY,
        src.scrollFactorX, src.scrollFactorY,
        src.displayOriginX, src.displayOriginY,
        0, 0, width, height,
        getTint(src.tintTopLeft, camera.alpha * src._alphaTL),
        getTint(src.tintTopRight, camera.alpha * src._alphaTR),
        getTint(src.tintBottomLeft, camera.alpha * src._alphaBL),
        getTint(src.tintBottomRight, camera.alpha * src._alphaBR),
        src.tintFill,
        0, 0,
        camera,
        parentMatrix,
        false,
        textureUnit
    );

    renderer.pipelines.postBatch(src);
};

export default WebGLRenderer;