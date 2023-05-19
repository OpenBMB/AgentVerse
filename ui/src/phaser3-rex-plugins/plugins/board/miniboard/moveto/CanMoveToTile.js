var CanMoveToTile = function (tileX, tileY, direction) {
    var miniBoard = this.parent;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
        return false;
    }

    myTileXYZ.x = miniBoard.tileX;
    myTileXYZ.y = miniBoard.tileY;
    targetTileXYZ.x = tileX;
    targetTileXYZ.y = tileY;
    // Move to current position
    if ((targetTileXYZ.x === myTileXYZ.x) && (targetTileXYZ.y === myTileXYZ.y)) {
        return true;
    }

    miniBoard.pullOutFromMainBoard();
    // Can not put on main board
    if (!miniBoard.canPutOnMainBoard(mainBoard, targetTileXYZ.x, targetTileXYZ.y)) {
        miniBoard.putBack();
        return false;
    }

    // Custom moveable test
    if (this.moveableTestCallback) {
        if (direction === undefined) {
            direction = mainBoard.getNeighborTileDirection(myTileXYZ, targetTileXYZ);
        }
        if (this.moveableTestScope) {
            var moveable = this.moveableTestCallback.call(this.moveableTestScope, myTileXYZ, targetTileXYZ, direction, mainBoard);
        } else {
            var moveable = this.moveableTestCallback(myTileXYZ, targetTileXYZ, direction, mainBoard);
        }
        if (!moveable) {
            miniBoard.putBack();
            return false;
        }
    }

    miniBoard.putBack();
    return true;
}

var myTileXYZ = { x: 0, y: 0, z: 0 };
var targetTileXYZ = { x: 0, y: 0, z: 0 };

export default CanMoveToTile;