var WorldXYToTileXY = function (worldX, worldY, out) {
    return this.grid.getTileXY(worldX, worldY, out);
}
export default WorldXYToTileXY;