var RemoveAllChess = function (destroy, fromBoardRemove) {
    var chess = this.getAllChess();
    for (var i = 0, cnt = chess.length; i < cnt; i++) {
        this.removeChess(chess[i], undefined, undefined, undefined, destroy, fromBoardRemove);
    }
    return this;
}
export default RemoveAllChess;