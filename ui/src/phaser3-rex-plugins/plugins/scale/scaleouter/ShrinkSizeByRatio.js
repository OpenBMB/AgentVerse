var ShrinkSizeByRatio = function (rectangle, maxRatio, minRatio) {
    var width = rectangle.width,
        height = rectangle.height,
        ratio = width / height;

    if ((maxRatio !== undefined) && (ratio > maxRatio)) {
        rectangle.width = height * maxRatio;  // Shrink width
    }

    if ((minRatio !== undefined) && (ratio < minRatio)) {
        rectangle.height = width / minRatio; // Shrink height
    }

    return rectangle;
}

export default ShrinkSizeByRatio;