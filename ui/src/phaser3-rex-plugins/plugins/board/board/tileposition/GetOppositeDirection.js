var GetOppositeDirection = function (tileX, tileY, direction) {
    if (tileX && (typeof (tileX) !== 'number')) {
        direction = tileY;
        var chess = tileX;
        var tileXY = this.chessToTileXYZ(chess);
        tileX = tileXY.x;
        tileY = tileXY.y;
    }
    return this.grid.getOppositeDirection(tileX, tileY, direction);
}
export default GetOppositeDirection;