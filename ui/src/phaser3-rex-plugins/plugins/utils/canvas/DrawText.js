var DrawText = function (
    canvas, context,
    x, y,
    text, font,
    fillStyle, strokeStyle, lineWidth,
    textAlign, textBaseline
) {

    if ((lineWidth === undefined) && (strokeStyle != null)) {
        lineWidth = 2;
    }

    if (textAlign === undefined) {
        textAlign = 'start';
    }

    if (textBaseline === undefined) {
        textBaseline = 'alphabetic';
    }

    context.font = font;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;

    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;

    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    if ((strokeStyle != null) && (strokeStyle !== 'none') && (lineWidth > 0)) {
        context.strokeText(text, x, y);
    }

    if ((fillStyle != null) && (fillStyle !== 'none')) {
        context.fillText(text, x, y);
    }

}

export default DrawText;