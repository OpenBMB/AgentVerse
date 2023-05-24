/* 
1. Falling down all chess
*/

var FallingAllChess = function (board, bejeweled) {
    var tileZ = bejeweled.getChessTileZ(),
        chess, moveTo;

    for (var tileY = (board.height - 1); tileY >= 0; tileY--) { // bottom to top
        for (var tileX = 0, cnt = board.width; tileX < cnt; tileX++) { // left to right
            chess = board.tileXYZToChess(tileX, tileY, tileZ);
            if (chess === null) {
                continue;
            }
            moveTo = bejeweled.getChessMoveTo(chess);
            do {
                moveTo.moveToward(1);
            } while (moveTo.lastMoveResult)
            if (moveTo.isRunning) {
                bejeweled.waitEvent(moveTo, 'complete');
            }
        }
    }
}

export default FallingAllChess;