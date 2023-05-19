var RemoveChess = function (gameObject, tileX, tileY, tileZ, destroy) {
    this.board.removeChess(gameObject, tileX, tileY, tileZ, destroy);
    return this;
}

export default RemoveChess;