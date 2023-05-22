const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var ToBase64 = function (gameObject, type, encoderOptions) {
    var frame = gameObject.frame;
    var cd = frame.canvasData;
    var canvas = CanvasPool.create2D(this, cd.width, cd.height);
    var ctx = canvas.getContext('2d', { willReadFrequently: true });

    ctx.drawImage(
        frame.source.image,
        cd.x,
        cd.y,
        cd.width,
        cd.height,
        0,
        0,
        cd.width,
        cd.height
    );

    var data = canvas.toDataURL(type, encoderOptions);

    CanvasPool.remove(canvas);

    return data;
}

export default ToBase64;