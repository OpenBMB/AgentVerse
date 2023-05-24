var GetEmptyTileXYArrayInRange = function (centerTileXY, radius, tileZ, out) {
    if (radius === undefined) {
        radius = 1;
    }
    if (tileZ === undefined) {
        tileZ = 0;
    }
    if (out === undefined) {
        out = [];
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileXYArray);
    var tileXY;
    for (var i = 0, cnt = globTileXYArray.length; i < cnt; i++) {
        tileXY = globTileXYArray[i];
        if (this.isEmptyTileXYZ(tileXY.x, tileXY.y, tileZ)) {
            out.push(tileXY);
        }
    }
    globTileXYArray.length = 0;
    return out;
}

var globTileXYArray = [];
export default GetEmptyTileXYArrayInRange;