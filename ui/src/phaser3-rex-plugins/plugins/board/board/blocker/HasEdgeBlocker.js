var HasEdgeBlocker = function (tileX, tileY, tileZ, direction) {
    var chess, blocker;
    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        chess = this.tileXYToChessArray(tileX, tileY, globChessArray);
        for (var i = 0, cnt = chess.length; i < cnt; i++) {
            if (isEdgeBlocker(this.getChessData(chess[i]).blocker)) {
                globChessArray.length = 0;
                return true;
            }
        }
        globChessArray.length = 0;
        return false;

    } else {
        // chess at (tileX, tileY, tileZ) has blocker
        var chess = this.tileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        return isEdgeBlocker(this.getChessData(chess).blocker);
    }
}

var isEdgeBlocker = function (blocker, direction) {
    if ((blocker === false) || (blocker === true)) {
        return blocker;
    } else {
        return (blocker[direction] === true);
    }
}

var globChessArray = [];

export default HasEdgeBlocker;