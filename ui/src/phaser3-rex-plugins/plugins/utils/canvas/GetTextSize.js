const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var GetTextSize = function (text, font, out) {
    if (out === undefined) {
        out = {};
    }
    
    var canvas = CanvasPool.create();

    var context = canvas.getContext('2d', { willReadFrequently: true });
    context.font = font;

    var metrics = context.measureText(text);
    var ascent = metrics.actualBoundingBoxAscent;
    var descent = metrics.actualBoundingBoxDescent;

    out.width = metrics.width;
    out.height = (ascent + descent);
    out.ascent = ascent;
    out.descent = descent;

    CanvasPool.remove(canvas);

    return out;
}

export default GetTextSize