var TileZToChessArray = function (tileZ, out) {
    if (out === undefined) {
        out = [];
    }
    var uids = this.boardData.UIDToXYZ;
    var tileXYZ;
    for (var uid in uids) {
        tileXYZ = uids[uid];
        if (tileXYZ.z !== tileZ) {
            continue;
        }
        out.push(this.uidToChess(uid));
    }
    return out;
}
export default TileZToChessArray;