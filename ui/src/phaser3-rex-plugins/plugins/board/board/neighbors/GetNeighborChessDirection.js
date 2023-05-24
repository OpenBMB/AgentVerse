var GetNeighborChessDirection = function (chess, neighborChess) {
    var srcTileXYZ = this.chessToTileXYZ(chess);
    var neighborTileXYZ = this.chessToTileXYZ(neighborChess);
    return this.getNeighborTileDirection(srcTileXYZ, neighborTileXYZ);
}
export default GetNeighborChessDirection;