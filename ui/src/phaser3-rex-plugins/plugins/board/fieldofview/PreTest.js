var PreTest = function (tileXYArray, visiblePoints) {
    if (this.occupiedTest || this.blockerTest || this.edgeBlockerTest) {
        var myTileZ = this.chessData.tileXYZ.z;
        var tileXY;
        for (var i = 1, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            // Occupied test
            if (this.occupiedTest) {
                if (this.board.contains(tileXY.x, tileXY.y, myTileZ)) {
                    return false;
                }
            }
            // Blocker test
            if (this.blockerTest) {
                if (this.board.hasBlocker(tileXY.x, tileXY.y)) {
                    return false;
                }
            }
            // Edge-blocker test
            if (this.edgeBlockerTest) {
                // TODO
            }
        }
    }

    if (this.preTestCallback) {
        if (this.preTestCallbackScope) {
            return this.preTestCallback.call(this.preTestCallbackScope, tileXYArray, visiblePoints, this);
        } else {
            return this.preTestCallback(tileXYArray, visiblePoints, this);
        }
    }

    return true;
}
export default PreTest;