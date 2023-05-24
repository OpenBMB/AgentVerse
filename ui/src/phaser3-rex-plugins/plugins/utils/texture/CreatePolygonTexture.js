import GetStyle from '../canvas/GetStyle.js';
import DrawPolygon from '../canvas/DrawPolygon.js';

var CreatePolygonTexture = function (
    scene,
    key,
    points,
    fillStyle,
    strokeStyle, lineWidth,
    expandSize,
    lineJoin
) {

    if ((fillStyle === undefined) && (strokeStyle === undefined)) {
        fillStyle = 0xffffff;
    }

    if (strokeStyle === undefined) {
        lineWidth = 0;
    } else if (lineWidth === undefined) {
        lineWidth = 2;
    }

    if (lineJoin === undefined) {
        lineJoin = 'round';
    }

    if (expandSize === undefined) {
        expandSize = false;
    }

    globBounds = GetBounds(points, globBounds);
    OffsetPoints(points, -globBounds.left, -globBounds.top);

    var width = globBounds.right - globBounds.left;
    var height = globBounds.bottom - globBounds.top;

    if (!expandSize) {
        IndentPoints(points, globBounds, lineWidth);
    } else {
        width += lineWidth;
        height += lineWidth;
        OffsetPoints(points, lineWidth / 2);
    }

    var texture = scene.sys.textures.createCanvas(key, Math.ceil(width), Math.ceil(height));
    var canvas = texture.getCanvas();
    var context = texture.getContext();

    DrawPolygon(
        canvas, context,
        points,
        GetStyle(fillStyle, canvas, context),
        GetStyle(strokeStyle, canvas, context),
        lineWidth,
        lineJoin
    )

    texture.refresh();
}

var GetBounds = function (points, out) {
    if (out === undefined) {
        out = {};
    }

    var left = Infinity,
        top = Infinity,
        right = -Infinity,
        bottom = -Infinity;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var p = points[i], px = p.x, py = p.y;
        left = Math.min(left, px);
        top = Math.min(top, py);
        right = Math.max(right, px);
        bottom = Math.max(bottom, py);
    }

    out.left = left;
    out.top = top;
    out.right = right;
    out.bottom = bottom;

    return out;
}

var IndentPoints = function (points, bounds, lineWidth) {
    if (lineWidth === 0) {
        return points;
    }

    var width = bounds.right - bounds.left;
    var height = bounds.bottom - bounds.top;
    var halfW = width / 2;
    var halfH = height / 2;
    var halfLW = lineWidth / 2;
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var p = points[i];
        p.x = Indent(p.x, halfW, halfLW);
        p.y = Indent(p.y, halfH, halfLW);
    }

    return points;
}

var Indent = function (value, halfBound, offset) {
    if (value < halfBound) {
        return (value + offset);
    } else if (value > halfBound) {
        return (value - offset);
    } else {
        return value;
    }
}

var OffsetPoints = function (points, x, y) {
    if (y === undefined) {
        y = x;
    }

    if ((x === 0) && (y === 0)) {
        return points;
    }

    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var p = points[i];
        p.x += x;
        p.y += y;
    }
    return points;
}

var globBounds;

export default CreatePolygonTexture;