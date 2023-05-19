import IsArray from '../../../utils/object/IsArray.js';

var FilledRingToTileXYArray = function (centerTileXY, radius, nearToFar, out) {
    if (IsArray(nearToFar)) {
        out = nearToFar;
        nearToFar = undefined;
    }

    if (nearToFar === undefined) {
        nearToFar = true;
    }
    if (out === undefined) {
        out = [];
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);

    var level;
    for (var i = 0; i <= radius; i++) {
        level = (nearToFar) ? i : (radius - i);
        this.ringToTileXYArray(centerTileXY, level, out);
    }
    return out;
}
export default FilledRingToTileXYArray;