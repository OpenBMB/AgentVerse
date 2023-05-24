const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var MeasureTextMargins = function (textStyle, testString, out) {
    if (out === undefined) {
        out = {};
    }

    var canvas = CanvasPool.create(this);
    var context = canvas.getContext('2d', { willReadFrequently: true });

    textStyle.syncFont(canvas, context);

    var metrics = context.measureText(testString);

    var width = Math.ceil(metrics.width * textStyle.baselineX);
    var baseline = width;
    var height = 2 * baseline;

    baseline = baseline * textStyle.baselineY | 0;

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = '#f00';
    context.fillRect(0, 0, width, height);

    context.font = textStyle._font;

    context.textBaseline = 'alphabetic';
    context.fillStyle = '#000';
    context.fillText(textStyle.testString, 0, baseline);

    out.left = 0;

    if ((width === 0) || (height === 0) || !context.getImageData(0, 0, width, height)) {
        CanvasPool.remove(canvas);
        return out;
    }

    var imagedata = context.getImageData(0, 0, width, height).data;
    var stop = false;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var idx = (y * width + x) * 4;
            if (imagedata[idx] !== 255) {
                out.left = x;
                stop = true;
                break;
            }
        }
        if (stop) {
            break;
        }
    }

    CanvasPool.remove(canvas);
    return out;
}

export default MeasureTextMargins;