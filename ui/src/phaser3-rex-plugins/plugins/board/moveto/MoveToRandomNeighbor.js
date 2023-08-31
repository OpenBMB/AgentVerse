import Clone from '../../utils/object/Clone.js';
import Shuffle from '../../utils/array/Shuffle.js';

var MoveToRandomNeighbor = function () {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    var directions = board.grid.allDirections;
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