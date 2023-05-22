const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;

var DrawHPalette = function (canvas, context, verticalMode) {
    if (verticalMode === undefined) {
        verticalMode = false;
    }
    var width = canvas.width;
    var height = canvas.height;
    var color = new Color();
    if (verticalMode) {
        for (var iy = 0; iy < height; iy++) {
            var h = Percent(iy, 0, height);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(0, iy, width, 1);
        }
    } else {
        for (var ix = 0; ix < width; ix++) {
            var h = Percent(ix, 0, width);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(ix, 0, 1, height);
        }
    }
}

var DrawSVPalette = function (canvas, context, h) {
    var width = canvas.width;
    var height = canvas.height;
    var imgData = context.getImageData(0, 0, width, height);
    var data = imgData.data;
    var color = new Color();
    for (var iy = 0; iy < height; iy++) {
        for (var ix = 0; ix < width; ix++) {
            var s = Percent(ix, 0, width);
            var v = 1 - Percent(iy, 0, height);
            color.setFromHSV(h, s, v);
            var i = ((iy * width) + ix) * 4;
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = 255;
        }
    }
    context.putImageData(imgData, 0, 0);
}

export {
    DrawHPalette,
    DrawSVPalette
};