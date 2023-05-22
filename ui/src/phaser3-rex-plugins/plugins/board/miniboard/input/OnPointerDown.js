var OnPointerDown = function (pointer) {
    if (!this.input.enable) {
        return;
    }
    if (!pointer.isDown) {
        return;
    }

    if (this.input.pointer === null) { // Catch new touch pointer
        this.input.pointer = pointer;
    }

    var hitChess = OnTouchTileStart.call(this, pointer);
    if (hitChess) {
        OnDragStart.call(this, pointer);
    }
}

var OnTouchTileStart = function (pointer) {
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
                gameObject.emit('miniboard.pointerdown', pointer);
            }
            this.emit('gameobjectdown', pointer, gameObject);
        }
        this.emit('pointerdown', pointer, this);
    }
    globChessArray.length = 0;
    return hitChess;
}

var OnDragStart = function (pointer) {
    var dragData = this.input.drag;
    // Drag by another pointer
    if (dragData.state === 1) {
        return;
    }

    var dragPosition = dragData.position;
    dragPosition.x = pointer.x - this.x;
    dragPosition.y = pointer.y - this.y;
    dragData.state = 1;
    this.emit('dragstart', pointer, dragPosition.x, dragPosition.y);
}

var globChessArray = [];

export default OnPointerDown;