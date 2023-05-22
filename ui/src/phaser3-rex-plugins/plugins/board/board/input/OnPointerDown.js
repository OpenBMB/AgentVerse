import EmitChessEvent from './EmitChessEvent.js';

var OnPointerDown = function (pointer) {
    if (!this.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    var board = this.board;
    if (this.pointer === null) { // Catch new touch pointer
        this.pointer = pointer;
    }
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    var tileX = out.x,
        tileY = out.y;
    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        return;
    }
    board.emit('tiledown', pointer, this.tilePosition);
    board.emit('tileover', pointer, this.tilePosition);

    var boardEventCallback = function (gameObject) {
        board.emit('gameobjectdown', pointer, gameObject);
        board.emit('gameobjectover', pointer, gameObject);
    }
    var chessEventCallback = function (gameObject) {
        gameObject.emit('board.pointerdown', pointer);
        gameObject.emit('board.pointerover', pointer);
    }

    EmitChessEvent(
        boardEventCallback,
        chessEventCallback,
        board, tileX, tileY,
        pointer
    );
};

export default OnPointerDown;