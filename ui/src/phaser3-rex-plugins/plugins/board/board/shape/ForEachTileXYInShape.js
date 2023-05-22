import GetValue from '../../../utils/object/GetValue.js';

var ForEachTileXYInShape = function (shape, callback, scope, config) {
    var testMode = GetValue(config, 'testMode', 0);
    var searchRectangle = GetValue(config, 'searchRectangle', shape);
    var order = GetValue(config, 'order', 0);

    if (scope) {
        callback = callback.bind(scope);
    }

    globLeftToptileXY = this.worldXYToTileXY(searchRectangle.left, searchRectangle.top, globLeftToptileXY);
    globRightBottomTileXY = this.worldXYToTileXY(searchRectangle.right, searchRectangle.bottom, globRightBottomTileXY);
    var left = globLeftToptileXY.x - 1,
        top = globLeftToptileXY.y - 1,
        right = globRightBottomTileXY.x + 1,
        bottom = globRightBottomTileXY.y + 1;

    this.forEachTileXY(
        function (tileXY, board) {
            if (IsInShape(board, shape, tileXY.x, tileXY.y, testMode)) {
                return callback(tileXY, board);
            }
        },
        this,
        {
            left: left,
            right: right,
            top: top,
            bottom: bottom
        }
    )

    return this;
};

var IsInShape = function (board, shape, x, y, testMode) {
    var targetWorldXY = board.tileXYToWorldXY(x, y, true);
    if (shape.contains(targetWorldXY.x, targetWorldXY.y)) {
        return true;
    }

    switch (testMode) {
        case 1:  // Test grid bounds (a rectangle)
            var rect = board.getGridBounds(x, y, true);
            return OverlapRectangle(shape, rect);

        case 2:  // Test grid points
            var points = board.getGridPoints(x, y, true);
            return ContainsAnyPoint(shape, points);

        default:
            return false;
    }
}

var OverlapRectangle = function (shape, rectangle) {
    var top = rectangle.top,
        bottom = rectangle.bottom,
        left = rectangle.left,
        right = rectangle.right;
    if (shape.contains(left, top)) {
        return true;
    }
    if (shape.contains(left, bottom)) {
        return true;
    }
    if (shape.contains(right, top)) {
        return true;
    }
    if (shape.contains(right, bottom)) {
        return true;
    }
    return false;
}

var ContainsAnyPoint = function (shape, points) {
    for (var i = 0, cnt = points.length; i < cnt; i++) {
        var point = points[i];
        if (shape.contains(point.x, point.y)) {
            return true;
        }
    }
    return false;
};

var globLeftToptileXY, globRightBottomTileXY;

export default ForEachTileXYInShape;