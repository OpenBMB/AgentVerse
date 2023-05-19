var SwapChess = function (gameObjectA, gameObjectB, align) {
    if (align === undefined) {
        align = true;
    }

    var tileXYZA = this.chessToTileXYZ(gameObjectA);
    var tileXYZB = this.chessToTileXYZ(gameObjectB);
    if ((tileXYZA == null) || (tileXYZB == null)) {
        return this;
    }
    this.removeChess(gameObjectA);
    this.removeChess(gameObjectB);
    this.addChess(gameObjectA, tileXYZB.x, tileXYZB.y, tileXYZB.z, align);
    this.addChess(gameObjectB, tileXYZA.x, tileXYZA.y, tileXYZA.z, align);
    return this;
};

export default SwapChess;
