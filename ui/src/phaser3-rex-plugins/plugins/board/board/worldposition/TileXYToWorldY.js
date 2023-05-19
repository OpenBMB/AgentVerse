var TileXYToWorldY = function (tileX, tileY) {
    // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
    return this.tileXYToWorldXY(tileX, tileY, true).y;
}
export default TileXYToWorldY;