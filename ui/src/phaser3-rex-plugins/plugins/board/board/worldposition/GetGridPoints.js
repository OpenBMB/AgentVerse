var GetGridPoints = function (tileX, tileY, points) {
    if (tileX && (typeof (tileX) !== 'number')) {
        points = tileY;
        var tileXY = this.chessToTileXYZ(tileX);  // tileX is a Chess or TileXY
        tileX = tileXY.x;
        tileY = tileXY.y;
    }
    return this.grid.getGridPoints(tileX, tileY, points);
}
export default GetGridPoints;