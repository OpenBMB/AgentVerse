var RemoveChess = function (gameObject, tileX, tileY, tileZ, destroy, fromBoardRemove) {
    if (destroy === undefined) {
        destroy = false;
    }
    if (fromBoardRemove === undefined) {
        fromBoardRemove = false;
    }
    if (gameObject) {
        var tileXYZ = this.chessToTileXYZ(gameObject);
        if (tileXYZ) {
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
            tileZ = tileXYZ.z;
        } else {
            // chess is not in this board
            return this;
        }
    } else {
        gameObject = this.tileXYZToChess(tileX, tileY, tileZ);
        if (!gameObject) {
            // chess is not in this board
            return this;
        }
    }

    if (!fromBoardRemove) {
        this.boardData.removeUID(tileX, tileY, tileZ);
    }
    if (this.isBoard) {
        this.getChessData(gameObject).setBoard(null);
    }

    if (destroy && gameObject.destroy) {
        gameObject.destroy();
    }

    return this;
}

export default RemoveChess;