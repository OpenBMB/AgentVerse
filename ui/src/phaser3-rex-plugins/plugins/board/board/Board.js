import LogicBoard from './LogicBoard.js';
import SetInteractive from './input/SetInteractive.js';
import ForEachCullTileXY from './camera/ForEachCullTileXY.js';

class Board extends LogicBoard {
    get touchZone() {
        if (this.input) {
            return this.input.touchZone;
        } else {
            return null;
        }
    }

    getTouchZone() {
        return this.touchZone;
    }
}

var methods = {
    setInteractive: SetInteractive,
    forEachCullTileXY: ForEachCullTileXY,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;