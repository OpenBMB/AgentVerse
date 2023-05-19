var DrawCircle = function (
    canvas, context,
    x, y,
    rx, ry,
    fillStyle, strokeStyle, lineWidth,
    startAngle, endAngle, anticlockwise
) {

    if (startAngle === undefined) {
        startAngle = 0;
    }
    if (endAngle === undefined) {
        endAngle = 2 * Math.PI;
    }
    if (anticlockwise === undefined) {
        anticlockwise = false;
    }

    context.beginPath();

    context.ellipse(x, y, rx, ry, 0, startAngle, endAngle, anticlockwise);

    if (fillStyle != null) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle != null) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}

export default DrawCircle;