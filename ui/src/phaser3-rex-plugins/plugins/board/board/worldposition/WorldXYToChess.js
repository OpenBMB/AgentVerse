var WorldXYToChess = function (worldX, worldY, tileZ) {
    var tileXY = this.worldXYToTileXY(worldX, worldY, true);
    if (tileZ !== undefined) {
        return this.tileXYZToChess(tileXY.x, tileXY.y, tileZ)
    } else {
        var tileZToUIDs = this.boardData.getUID(tileXY.x, tileXY.y);
        if (tileZToUIDs == null) {
            return null;
        }
        for (var tileZ in tileZToUIDs) {
            return this.uidToChess(tileZToUIDs[tileZ]);
        }
    }
}

export default WorldXYToChess;