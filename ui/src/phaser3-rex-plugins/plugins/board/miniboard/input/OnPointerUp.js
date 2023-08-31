import OnDragEnd from './DragEnd.js';

var OnPointerUp = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    OnTouchTileEnd.call(this, pointer);
    OnDragEnd.call(this, pointer);

    if (this.input.pointer === pointer) { // Release touch pointer
        this.input.pointer = null;
    }
}

var OnTouchTileEnd = function (pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
        tileY = out.y;
    grid.restoreOrigin();
    this.input.tilePosition.x = tileX;
    this.input.tilePosition.y = tileY;

    // Get touched chess
    var gameObjects = this.board.tileXYToChessArray(tileX, tileY, globChessArray);
    var hitChess = (gameObjects.length > 0);
    if (hitChess) {
        // Fire events
        var gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (gameObject.emit) {
                gameObject.emit('miniboard.pointerup', pointer);
            }
            this.emit('gameobjectup', pointer, gameObject);
        }
        this.emit('pointerup', pointer, this);
    }
    globChessArray.length = 0;
    return hitChess;
}

var globChessArray = [];

export default OnPointerUp;