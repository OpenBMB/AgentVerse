import AddPolygonPath from './AddPolygonPath.js';

var DrawPolygon = function (
    canvas, context,
    points,
    fillStyle,
    strokeStyle, lineWidth,
    lineJoin
) {

    if (lineJoin === undefined) {
        lineJoin = 'round';
    }

    AddPolygonPath(context, points);

    context.lineJoin = lineJoin;

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

export default DrawPolygon