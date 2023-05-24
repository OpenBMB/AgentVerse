var AddPolygonPath = function (context, points) {
    context.save();
    context.beginPath();

    var point = points[0];

    context.moveTo(point.x, point.y);

    for (var i = 1, cnt = points.length; i < cnt; i++) {
        point = points[i];
        context.lineTo(point.x, point.y);
    }

    context.closePath();
    context.restore();
}

export default AddPolygonPath;