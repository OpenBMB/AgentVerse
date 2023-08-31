var GetDistance = function (tileA, tileB, roughMode) {
    tileA = this.chessToTileXYZ(tileA);
    tileB = this.chessToTileXYZ(tileB);
    return this.grid.getDistance(tileA, tileB, roughMode);
}
export default GetDistance;