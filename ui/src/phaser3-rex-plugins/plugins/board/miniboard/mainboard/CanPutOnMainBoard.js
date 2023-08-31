var CanPutOnMainBoard = function (mainBoard, tileX, tileY, chessTileXYMap) {
    if (!mainBoard) {
        return false;
    }
    if (chessTileXYMap === undefined) {
        chessTileXYMap = this.tileXYZMap; // {uid:{x,y,z}}
    }

    var chessTileXYZ, mappedTileXY, isOccupied;
    for (var uid in chessTileXYMap) {
        chessTileXYZ = chessTileXYMap[uid];
        mappedTileXY = mainBoard.offset(chessTileXYZ, tileX, tileY, true);
        if (!mainBoard.contains(mappedTileXY.x, mappedTileXY.y)) {
            return false;
        }

        if (this.putTestCallback) {
            // Custom test function
            targetTileXY.x = mappedTileXY.x;
            targetTileXY.y = mappedTileXY.x;
            targetTileXY.z = chessTileXYZ.z;
            var chess = this.board.uidToChess(uid);
            if (this.putTestCallbackScpe) {
                isOccupied = this.putTestCallback.call(this.putTestCallbackScpe, targetTileXY, mainBoard, chess);
            } else {
                isOccupied = this.putTestCallback(targetTileXY, mainBoard, chess);
            }
        } else {
            // Default test function
            isOccupied = mainBoard.contains(mappedTileXY.x, mappedTileXY.y, chessTileXYZ.z);
        }
        if (isOccupied) {
            return false;
        }
    }
    return true;
}

var targetTileXY = { x: 0, y: 0, z: 0, };

export default CanPutOnMainBoard;