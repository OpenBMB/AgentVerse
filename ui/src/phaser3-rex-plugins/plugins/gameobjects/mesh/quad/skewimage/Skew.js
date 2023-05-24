var Skew = function (gameObject, skewX, skewY) {
    if (skewX === undefined) {
        skewX = 0;
    }
    if (skewY === undefined) {
        skewY = 0;
    }

    var width = gameObject.width,
        height = gameObject.height;
    var ox = width * 0.5;
    var oy = height * 0.5;
    var xOffset = Math.tan(skewX) * oy;
    var yOffset = Math.tan(skewY) * ox;
    var controlPoints = gameObject.controlPoints;
    for (var i = 0, cnt = controlPoints.length; i < cnt; i++) {
        var controlPoint = controlPoints[i];
        var x = controlPoint.localXOrigin;
        var y = controlPoint.localYOrigin;
        controlPoint.localX = x + ((y > oy) ? xOffset : -xOffset);
        controlPoint.localY = y + ((x > ox) ? yOffset : -yOffset);
    }
}

export default Skew;