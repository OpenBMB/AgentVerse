import Clone from '../../../utils/object/Clone.js';
import Shuffle from '../../../utils/array/Shuffle.js';

var MoveToRandomNeighbor = function () {
    var miniBoard = this.parent;
    var mainBoard = miniBoard.mainBoard;
    // Not on a mainBoard
    if (mainBoard == null) {
        this.lastMoveResult = false;
        return this;
    }

    var directions = mainBoard.grid.allDirections;
    if (globDirections.length !== directions.length) {
        Clone(directions, globDirections);
    }
    Shuffle(globDirections);
    for (var i = 0, cnt = globDirections.length; i < cnt; i++) {
        this.moveToward(globDirections[i]);
        if (this.lastMoveResult) {
            return this;
        }
    }
    return this;
}

var globDirections = [];
export default MoveToRandomNeighbor;