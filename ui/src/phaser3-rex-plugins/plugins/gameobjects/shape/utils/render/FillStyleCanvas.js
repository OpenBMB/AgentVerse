var FillStyleCanvas = function (ctx, src, altColor, altAlpha)
{
    var fillColor = (altColor) ? altColor : src.fillColor;
    var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

    var red = ((fillColor & 0xFF0000) >>> 16);
    var green = ((fillColor & 0xFF00) >>> 8);
    var blue = (fillColor & 0xFF);

    ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
};

export default FillStyleCanvas;
