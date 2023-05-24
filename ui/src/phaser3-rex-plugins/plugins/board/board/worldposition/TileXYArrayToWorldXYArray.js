var TileXYArrayToWorldXYArray = function (tileXYArray, out) {
    if (out === undefined) {
        out = [];
    }

    var tileXY;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        out.push(this.tileXYToWorldXY(tileXY.x, tileXY.y));
    }
    return out;
};
export default TileXYArrayToWorldXYArray;