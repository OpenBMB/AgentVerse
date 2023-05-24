var DirectionBetween = function (chessA, chessB, round) {
    if (round === undefined) {
        round = true;
    }
    var tileA = this.chessToTileXYZ(chessA);
    var tileB = this.chessToTileXYZ(chessB);
    return this.grid.directionBetween(tileA, tileB, round);
}
export default DirectionBetween;