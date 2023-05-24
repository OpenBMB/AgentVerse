import IsUID from '../../chess/IsUID.js';

var AddChess = function (gameObject, tileX, tileY, tileZ) {
    var grid = this.grid;
    grid.saveOrigin();
    grid.setOriginPosition(this.x, this.y);

    // Add chess to borad
    this.board.addChess(gameObject, tileX, tileY, tileZ, true);
    // Add chess to container
    if (IsUID(gameObject)) {
        gameObject = this.board.uidToChess(gameObject);
    }
    this.add(gameObject);

    grid.restoreOrigin();
    return this;
}

export default AddChess;