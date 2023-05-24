var PutOnMainBoard = function (mainBoard, tileX, tileY, align) {
    if (!mainBoard) {
        return this;
    }

    if (tileX === undefined) {
        var out = mainBoard.worldXYToTileXY(this.x, this.y, true);
        tileX = out.x;
        tileY = out.y;
    }
    if (align === undefined) {
        align = true;
    }

    this.pullOutFromMainBoard();
    if (!this.canPutOnMainBoard(mainBoard, tileX, tileY)) {
        return this;
    }

    this.setMainBoard(mainBoard, tileX, tileY);
    var tileXYZMap = this.tileXYZMap; // {uid:{x,y,z}}
    var chessTileXYZ, mappedTileXY;
    for (var uid in tileXYZMap) {
        chessTileXYZ = tileXYZMap[uid];
        uid = parseInt(uid);

        mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY, true);
        mainBoard.addChess(uid, mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z, false);
    }
    if (align) {
        this.alignToMainBoard(mainBoard, tileX, tileY);
    }

    return this;
}
export default PutOnMainBoard;