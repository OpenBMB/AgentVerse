import AreTileXYEqual from '../../utils/AreTileXYEqual.js';
import EmitChessEvent from './EmitChessEvent.js';

var OnPointerMove = function (pointer) {
    if (!this.enable) {
        return;
    }

    var board = this.board;
    // Get touched tileX, tileY
    var out = board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    if (AreTileXYEqual(this.tilePosition, out)) {
        // Tile position dose not change
        return;
    }

    this.prevTilePosition.x = this.tilePosition.x;
    this.prevTilePosition.y = this.tilePosition.y;
    // prevTilePosition might be undefined at beginning
    if ((this.prevTilePosition.x != null) && (this.prevTilePosition.y != null)) {
        board.emit('tileout', pointer, this.prevTilePosition);
    }

    var tileX = out.x,
        tileY = out.y;
    this.tilePosition.x = tileX;
    this.tilePosition.y = tileY;
    if (!board.contains(tileX, tileY)) {
        // Move outside
        EmitChessEvent(
            'gameobjectout',
            'board.pointerout',
            board, this.prevTilePosition.x, this.prevTilePosition.y,
            pointer
        );

        if (this.pointer === pointer) { // Release touch pointer
            this.pointer = null;
        }
        return;
    }

    if (this.pointer === null) { // Catch new touch pointer
        this.pointer = pointer;
    }

    board.emit('tilemove', pointer, this.tilePosition);
    board.emit('tileover', pointer, this.tilePosition);

    EmitChessEvent(
        'gameobjectout',
        'board.pointerout',
        board, this.prevTilePosition.x, this.prevTilePosition.y,
        pointer
    );

    var boardEventCallback = function (gameObject) {
        board.emit('gameobjectmove', pointer, gameObject);
        board.emit('gameobjectover', pointer, gameObject);
    }
    var chessEventCallback = function (gameObject) {
        gameObject.emit('board.pointermove', pointer);
        gameObject.emit('board.pointerover', pointer);
    }

    EmitChessEvent(
        boardEventCallback,
        chessEventCallback,
        board, tileX, tileY,
        pointer
    );
};

export default OnPointerMove;
