// Offset tileXYArray to (0,0), and set board size to fit tileXYArray
var Fit = function (tileXYArray) {
    // Get minimum tileX, tileY
    var minX = Infinity;
    var minY = Infinity;
    var tileXY;
    for (var i in tileXYArray) {
        tileXY = tileXYArray[i];
        minX = Math.min(minX, tileXY.x);
        minY = Math.min(minY, tileXY.y);
    }
    // Offset tileXYArray to (0,0)
    if ((minX !== 0) || (minY !== 0)) {
        for (var i in tileXYArray) {
            tileXY = tileXYArray[i];
            this.offset(tileXY, -minX, -minY, tileXY);
        }
    }

    // Get maximun tileX, tileY
    var maxX = -Infinity;
    var maxY = -Infinity;
    for (var i in tileXYArray) {
        tileXY = tileXYArray[i];
        maxX = Math.max(maxX, tileXY.x);
        maxY = Math.max(maxY, tileXY.y);
    }
    // Set board size
    this.setBoardWidth(maxX + 1);
    this.setBoardHeight(maxY + 1);
    return tileXYArray;
}
export default Fit;