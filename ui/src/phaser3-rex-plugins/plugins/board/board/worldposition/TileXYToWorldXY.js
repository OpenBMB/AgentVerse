var TileXYToWorldXY = function (tileX, tileY, out) {
    return this.grid.getWorldXY(tileX, tileY, out);
}
export default TileXYToWorldXY;