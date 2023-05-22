var OnPointerMove = function (pointer) {
    if (!this.input.enable) {
        return;
    }

    OnTouchTileMove.call(this, pointer);
    OnDrag.call(this, pointer);
}

var OnTouchTileMove = function (pointer) {
    // Get touched tileX, tileY
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);
    var out = this.board.worldXYToTileXY(pointer.x, pointer.y, true);
    var tileX = out.x,
        tileY = out.y;
    grid.restoreOrigin();

    if ((this.input.tilePosition.x === tileX) && (this.input.tilePosition.y === tileY)) {
        // Tile position dose not change
        return;
    }
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
                gameObject.emit('miniboard.pointermove', pointer);
            }
            this.emit('gameobjectmove', pointer, gameObject);
        }
        this.emit('pointermove', pointer, this);
    } else {
        // Move outside
        if (this.input.pointer === pointer) { // Release touch pointer
            this.input.pointer = null;
        }
    }
    globChessArray.length = 0;

    // Not dragging
    if (this.input.drag.state === 0) {
        if (this.input.pointer === pointer) {
            if (!hitChess) {
                this.input.pointer = null; // Release touch pointer
            }
        } else if (this.input.pointer === null) {
            this.input.pointer = pointer; // Catch new touch pointer
        }
    }
}

var OnDrag = function (pointer) {
    var dragData = this.input.drag;
    // Not dragging
    if (dragData.state === 0) {
        return;
    }

    var dragPosition = dragData.position;
    var dragX = pointer.x - dragPosition.x;
    var dragY = pointer.y - dragPosition.y;
    this.emit('drag', pointer, dragX, dragY);
}

var globChessArray = [];

export default OnPointerMove;