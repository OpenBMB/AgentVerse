import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import ChessBank from './ChessBank.js';
import GetTileDirection from './GetTileDirection.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';

const uidKey = ChessBank.uidKey;

class Chess extends ComponentBase {
    constructor(parent, uid) {
        super(parent, { eventEmitter: false });
        // this.parent

        ChessBank.add(this, uid); // uid is stored in `this.$uid`
        this.board = null;
        this.blocker = false;
    }


    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        if (this.board) {
            this.board.removeChess(this[uidKey]);
        }
        ChessBank.remove(this[uidKey]);
        this.board = null;

        super.shutdown(fromScene);
    }

    setBoard(board) {
        this.board = board;
        return this;
    }

    get tileXYZ() {
        if (this.board == null) {
            return null;
        }
        return this.board.chessToTileXYZ(this[uidKey]);
    }

    setTileZ(tileZ) {
        if (this.board == null) {
            return this;
        }
        this.board.setChessTileZ(this.parent, tileZ);
        return this;
    }

    setBlocker(value) {
        if (value === undefined) {
            value = true;
        }
        this.blocker = value;
        return this;
    }

    setBlockEdge(direction, value) {
        if (this.blocker === false) {
            this.blocker = {};
        }
        var blocker = this.blocker;
        if (IsPlainObject(direction)) {
            var blockEdges = direction;
            for (direction in blockEdges) {
                blocker[direction] = blockEdges[direction];
            }
        } else {
            if (value === undefined) {
                value = true;
            }
            blocker[direction] = value;
        }
        return this;
    }

    getBlockEdge(direction) {
        var blocker = this.blocker;
        if (blocker === false) {
            return false;
        }

        if (!blocker.hasOwnProperty(direction)) {
            return false;
        } else {
            return blocker[direction];
        }
    }
}

var methods = {
    getTileDirection: GetTileDirection
};
Object.assign(
    Chess.prototype,
    methods
);

export default Chess;