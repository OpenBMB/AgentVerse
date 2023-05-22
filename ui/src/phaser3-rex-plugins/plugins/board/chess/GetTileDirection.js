var GetTileDirection = function(tileX, tileY) {
    var board = this.board;
    if (board === null) {
        return null;
    }
    globTileXY.x = tileX;
    globTileXY.y = tileY;
    return board.getNeighborTileDirection(this.tileXYZ, globTileXY);
}

var globTileXY = {
    x: 0,
    y: 0
};
export default GetTileDirection;