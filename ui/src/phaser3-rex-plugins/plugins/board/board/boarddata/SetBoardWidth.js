var SetBoardWidth = function (width) {
    if (this.infinityMode) {
        return this;
    }
    if ((this.width === undefined) || (this.width <= width)) {
        this.width = width;
        return this;
    }

    // this.width > width : collapse
    var tileX, tileY, tileZ, tileZToUIDs;
    for (tileX = width; tileX < this.width; tileX++) {
        for (tileY = 0; tileY < this.height; tileY++) {
            tileZToUIDs = this.boardData.getUID(tileX, tileY);
            for (tileZ in tileZToUIDs) {
                this.RemoveChess(false, tileX, tileY, tileZ);
            }
        }
    }

    this.width = width;
    return this;
}

export default SetBoardWidth;