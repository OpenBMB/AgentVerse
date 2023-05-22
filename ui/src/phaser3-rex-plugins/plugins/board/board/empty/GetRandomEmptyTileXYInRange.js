import Shuffle from '../../../utils/array/Shuffle.js';

var GetRandomEmptyTileXYInRange = function (centerTileXY, radius, tileZ, out) {
    if (radius === undefined) {
        radius = 1;
    }
    if (tileZ === undefined) {
        tileZ = 0;
    }
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileXYArray);
    Shuffle(globTileXYArray);

    var tileXY;
    for (var i = 0, cnt = globTileXYArray.length; i < cnt; i++) {
        tileXY = globTileXYArray[i];
        if (this.isEmptyTileXYZ(tileXY.x, tileXY.y, tileZ)) {
            out.x = tileXY.x;
            out.y = tileXY.y;
            globTileXYArray.length = 0;
            return out;
        }
    }

    globTileXYArray.length = 0;
    return null;
}

var globTileXYArray = [];
var globTileXY = {};
export default GetRandomEmptyTileXYInRange;