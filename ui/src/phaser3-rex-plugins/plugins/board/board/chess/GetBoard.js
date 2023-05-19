var GetBoard = function (chess) {
    if (!chess) {
        return undefined;
    } else if (chess.rexChess) {  // Chess game object
        return chess.rexChess.board;
    } else if (chess.mainBoard) { // Mini-board
        return chess.mainBoard;
    } else {
        return undefined;
    }
}

export default GetBoard;