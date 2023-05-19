var CanMoveToTile = function (tileX, tileY, direction) {
    var board = this.chessData.board;
    // Chess is not in a board
    if (board == null) {
        return false;
    }
    var myTileXYZ = this.chessData.tileXYZ;
    var myTileX = myTileXYZ.x,
        myTileY = myTileXYZ.y,
        myTileZ = myTileXYZ.z;

    // Move to current position
    if ((tileX === myTileX) && (tileY === myTileY)) {
        return true;
    }

    // Target position is not in board
    if (!board.contains(tileX, tileY)) {
        return false;
    }

    // Blocker test
    if (this.blockerTest) {
        if (board.hasBlocker(tileX, tileY)) {
            return false;
        }
    }

    // Edge-blocker test
    if (this.edgeBlockerTest) {
        // // TODO
    }

    // Custom moveable test
    if (this.moveableTestCallback) {
        if (direction === undefined) {
            direction = this.chessData.getTileDirection(tileX, tileY);
        }
        targetTileXY.x = tileX;
        targetTileXY.y = tileY;
        targetTileXY.z = myTileZ;
        if (this.moveableTestScope) {
            var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, targetTileXY, direction, board);
        } else {
            var moveable = this.moveableTestCallback(myTileXYZ, targetTileXY, direction, board);
        }
        if (!moveable) {
            return false;
        }
    }

    // Sneak mode, change tileZ in MoveToTile method
    // if (this.sneakMode) {
    // }

    // Occupied test
    if (this.occupiedTest && !this.sneakMode) {
        var occupiedChess = board.tileXYZToChess(tileX, tileY, myTileZ);
        if (occupiedChess) {
            this.emit('occupy', occupiedChess, this.parent, this);
            // Try to move occupiedChess away in this event
            // Still ooccupied?
            if (board.contains(tileX, tileY, myTileZ)) {
                return false;
            }
        }
    }

    return true;
}

var targetTileXY = { x: 0, y: 0, z: 0, };

export default CanMoveToTile;