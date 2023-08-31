import IsArray from '../../../utils/object/IsArray.js';

var FilledRingToChessArray = function (centerTileXY, radius, tileZ, nearToFar, out) {
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
        this.ringToChessArray(centerTileXY, level, tileZ, out);
    }
    return out;
}
export default FilledRingToChessArray;