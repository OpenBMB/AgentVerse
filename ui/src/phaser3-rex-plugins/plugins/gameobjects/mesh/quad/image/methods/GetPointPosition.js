var GetPointPosition = function (quad) {
    var points;
    var top = 0, bottom = quad.height,
        left = 0, right = quad.width;
    if (quad.isNinePointMode) {
        var centerX = (left + right) / 2;
        var centerY = (top + bottom) / 2;
        points = [
            left, top,        // top-left
            centerX, top,     // top-center
            right, top,       // top-right
            left, centerY,    // center-left
            centerX, centerY, // center-center
            right, centerY,   // top-right
            left, bottom,     // center-left
            centerX, bottom,  // bottom-center
            right, bottom     // bottom-right
        ];
    } else {
        points = [
            left, top,        // top-left
            right, top,       // top-right
            left, bottom,     // bottom-left
            right, bottom     // bottom-right
        ];
    }

    return points;
}
export default GetPointPosition;