var TileXYToChessArray = function (tileX, tileY, out) {
    if (out === undefined) {
        out = [];
    }
    var tileZToUIDs = this.boardData.getUID(tileX, tileY);
    if (tileZToUIDs == null) {
        return out;
    }

    for (var tileZ in tileZToUIDs) {
        out.push(this.uidToChess(tileZToUIDs[tileZ]));
    }
    return out;
}
export default TileXYToChessArray;