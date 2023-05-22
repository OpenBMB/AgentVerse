var WorldXYToChessArray = function (worldX, worldY, out) {
    var tileXY = this.worldXYToTileXY(worldX, worldY, true);
    return this.tileXYToChessArray(tileXY.x, tileXY.y, out)
}

export default WorldXYToChessArray;