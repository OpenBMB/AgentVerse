var RingToTileXYArray = function (centerTileXY, radius, out) {
    if (out === undefined) {
        out = [];
    }

    centerTileXY = this.chessToTileXYZ(centerTileXY);
    this.grid.ringToTileXYArray(centerTileXY, radius, globTileArray);
    var tileXY;
    for (var i = 0, cnt = globTileArray.length; i < cnt; i++) {
        tileXY = globTileArray[i];
        if (this.contains(tileXY.x, tileXY.y)) {
            out.push(tileXY);
        }
    }
    globTileArray.length = 0;
    return out;
}

var globTileArray = [];
export default RingToTileXYArray;