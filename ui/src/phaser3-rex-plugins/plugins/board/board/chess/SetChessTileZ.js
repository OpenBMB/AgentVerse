var SetChessTileZ = function (chess, tileZ, align) {
    if (align === undefined) {
        align = false;
    }
    var tileXYZ = this.chessToTileXYZ(chess);
    if (tileXYZ) {
        this.moveChess(chess, tileXYZ.x, tileXYZ.y, tileZ, align);
    }
    return this;
}

export default SetChessTileZ;