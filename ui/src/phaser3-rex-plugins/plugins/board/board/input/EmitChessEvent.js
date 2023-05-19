import InputCandidate from './../../../utils/input/InputCandidate.js';

var EmitChessEvent = function (boardEventName, chessEventName, board, tileX, tileY, pointer) {
    if ((tileX == null) || (tileY == null)) {
        return;
    }

    var boardEventCallback = (typeof (boardEventName) !== 'string') ? boardEventName : undefined;
    var chessEventCallback = (typeof (chessEventName) !== 'string') ? chessEventName : undefined;

    var gameObjects = board.tileXYToChessArray(tileX, tileY, globChessArray);
    // Fire events
    var gameObject;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (!InputCandidate(gameObject)) {
            continue;
        }

        if (gameObject.emit) {
            if (!chessEventCallback) {
                gameObject.emit(chessEventName, pointer);
            } else {
                chessEventCallback(gameObject);
            }
        }

        if (!boardEventCallback) {
            board.emit(boardEventName, pointer, gameObject);
        } else {
            boardEventCallback(gameObject);
        }
    }
    globChessArray.length = 0;
}

var globChessArray = [];

export default EmitChessEvent;