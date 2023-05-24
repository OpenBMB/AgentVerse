var TileXYZToChess = function (tileX, tileY, tileZ) {
    var uid = this.boardData.getUID(tileX, tileY, tileZ);
    return this.uidToChess(uid);
}
export default TileXYZToChess;