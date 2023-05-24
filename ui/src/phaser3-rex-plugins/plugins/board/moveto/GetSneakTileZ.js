var GetSneakTileZ = function (moveTo, tileX, tileY, tileZ) {
    var board = moveTo.chessData.board;
    var sneakTileZ = tileZ.toString();
    do {
        sneakTileZ += '.';
    } while (board.contains(tileX, tileY, sneakTileZ))
    return sneakTileZ;
}

export default GetSneakTileZ;