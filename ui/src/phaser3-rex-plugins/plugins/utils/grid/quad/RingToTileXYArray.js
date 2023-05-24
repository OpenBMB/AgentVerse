import Offset from './Offset.js';

var RingToTileXYArray = function (centerTileXY, radius, out) {
    if (out === undefined) {
        out = [];
    }

    var i, j;
    // Top-right to bottom-right
    i = radius;
    for (j = -radius; j <= radius; j++) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Bottom-right to bottom-left
    j = radius;
    for (i = radius - 1; i >= -radius; i--) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Bottom-left to top-left
    i = -radius;
    for (j = radius - 1; j >= -radius; j--) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Top-left to top-right
    j = -radius;
    for (i = -radius + 1; i <= radius - 1; i++) {
        out.push(Offset(centerTileXY, i, j));
    }

    return out;
}
export default RingToTileXYArray;