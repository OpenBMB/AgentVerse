var SetBoardHeight = function (height) {
    if (this.infinityMode) {
        return this;
    }
    if ((this.height === undefined) || (this.height <= height)) {
        this.height = height;
        return this;
    }

    // this.height > height : collapse
    var tileX, tileY, tileZ, tileZToUIDs;
    for (tileY = height; tileY < this.height; tileY++) {
        for (tileX = 0; tileX < this.width; tileX++) {
            tileZToUIDs = this.boardData.getUID(tileX, tileY);
            for (tileZ in tileZToUIDs) {
                this.RemoveChess(false, tileX, tileY, tileZ);
            }
        }
    }

    this.height = height;
    return this;
}

export default SetBoardHeight;