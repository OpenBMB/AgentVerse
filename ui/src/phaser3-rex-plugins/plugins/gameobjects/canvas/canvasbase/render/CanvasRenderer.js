// copy from Phaser.GameObjects.Text

var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateTexture();
        src.dirty = false;
    }

    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    camera.addToRenderList(src);

    renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

export default CanvasRenderer;