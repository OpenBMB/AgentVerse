var TileXYToWorldX = function (tileX, tileY) {
    // console.warn('Use board.tileXYToWorldXY instead of (board.tileXYToWorldX, board.tileXYToWorldY)');
    return this.tileXYToWorldXY(tileX, tileY, true).x;
}
export default TileXYToWorldX;