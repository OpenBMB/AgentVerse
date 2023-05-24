var AlignToMainBoard = function (mainBoard, tileX, tileY) {
    if (!mainBoard) {
        return this;
    }

    if (tileX === undefined) {
        var out = mainBoard.worldXYToTileXY(this.x, this.y, true);
        tileX = out.x;
        tileY = out.y;
    }
    mainBoard.gridAlign(this, tileX, tileY);
    return this;
}

export default AlignToMainBoard;