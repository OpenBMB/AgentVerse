var TileXYArrayToChessArray = function (tileXYArray, tileZ, out) {
    if (Array.isArray(tileZ)) {
        out = tileZ;
        tileZ = undefined;
    }
    if (out === undefined) {
        out = [];
    }
    var tileZMode = (tileZ != null);
    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if (tileZMode) {
            out.push(this.tileXYZToChess(tileXY.x, tileXY.y, tileZ));
        } else {
            this.tileXYToChessArray(tileXY.x, tileXY.y, out);
        }
    }
    return out;
}
export default TileXYArrayToChessArray;