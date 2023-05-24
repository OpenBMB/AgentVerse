var MoveAway = function (tileX, tileY, moveAwayMode) {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    if (typeof (tileX) !== 'number') {
        var config = tileX;
        tileX = config.x;
        tileY = config.y;
    }
    targetTileXY.x = tileX;
    targetTileXY.y = tileY;
    if (moveAwayMode === undefined) {
        moveAwayMode = true;
    }

    var myTileXYZ = this.chessData.tileXYZ;
    var directions = board.grid.allDirections;

    // Get tileXY and distance of each neighbor, and current tile position
    for (var i = 0, cnt = directions.length + 1; i < cnt; i++) {
        var chessInfo = globChessInfo[i];
        if (!chessInfo) {
            chessInfo = {};
            globChessInfo.push(chessInfo);
        }

        if (i < (cnt - 1)) {
            // Neighbors
            var out = board.getNeighborTileXY(myTileXYZ, i, chessInfo);
            if (out === null) { // Invalid neighbor tile position
                chessInfo.x = undefined;
                chessInfo.y = undefined;
                chessInfo.distance = undefined;
            } else {
                chessInfo.distance = board.getDistance(chessInfo, targetTileXY, true);
            }
        } else {
            // Current tile
            chessInfo.direction = undefined;
            chessInfo.x = myTileXYZ.x;
            chessInfo.y = myTileXYZ.y;
            chessInfo.distance = board.getDistance(chessInfo, targetTileXY, true);
        }

    }
    globChessInfo.length = directions.length + 1;

    // Sort chess info
    var previousDirection = this.destinationDirection;
    globChessInfo.sort(function (infoA, infoB) {
        var distanceA = infoA.distance,
            distanceB = infoB.distance;
        // Invalid tile position
        if (distanceA === undefined) {
            return 1;
        }
        if (distanceB === undefined) {
            return -1;
        }

        if (distanceA > distanceB) {
            return (moveAwayMode) ? -1 : 1;
        }
        if (distanceA < distanceB) {
            return (moveAwayMode) ? 1 : -1;
        }

        // Equal-to case
        var directionA = infoA.direction,
            directionB = infoB.direction;
        // Diagonal
        if (directionA === previousDirection) {
            return 1;
        }
        if (directionB === previousDirection) {
            return -1;
        }
        // Current tile position
        if (directionA === undefined) {
            return 1;
        }
        if (directionB === undefined) {
            return -1;
        }
        return 0;
    });

    // Try move to neighbor, or current tile position
    for (var i = 0, cnt = globChessInfo.length; i < cnt; i++) {
        chessInfo = globChessInfo[i];
        if (chessInfo.distance === null) { // Invalid tile position
            return this;
        }
        this.moveTo(chessInfo);
        if (this.lastMoveResult) {
            return this;
        }
    }
    return this;
}

var targetTileXY = {
    x: 0,
    y: 0
}
var globChessInfo = [];
export default MoveAway;