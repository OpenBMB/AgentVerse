const SetTransform = Phaser.Renderer.Canvas.SetTransform;

var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    var ctx = renderer.currentContext;

    var bobs = src.getRenderList();
    if ((bobs.length === 0) || (!SetTransform(renderer, ctx, src, camera, parentMatrix))) {
        return;
    }

    camera.addToRenderList(src);

    var roundPixels = camera.roundPixels;

    var dx = -src._displayOriginX,
        dy = -src._displayOriginY;

    ctx.translate(dx, dy);

    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
        bobs[i].canvasRender(ctx, dx, dy, roundPixels);
    }

    //  Restore the context saved in SetTransform
    ctx.restore();
};

export default CanvasRenderer;
