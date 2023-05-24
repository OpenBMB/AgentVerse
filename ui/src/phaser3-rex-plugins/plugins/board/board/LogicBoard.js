import EE from '../../utils/eventemitter/EventEmitter.js';
import LogicMethods from './LogicMethods.js';
import BoardData from './boarddata/BoardData.js';
import DefaultGrids from '../grid/index.js';
import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import GetBoard from './chess/GetBoard.js';

class Board extends EE {
    constructor(scene, config) {
        // scene: scene instance, or undefined
        super();

        this.isShutdown = false;
        this.scene = scene;
        this.boardData = new BoardData();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isBoard = GetValue(o, 'isBoard', true);  // false: in Miniboard
        this.setGrid(GetValue(o, 'grid', undefined));
        this.setWrapMode(GetValue(o, 'wrap', false));
        this.setInfinityMode(GetValue(o, 'infinity', false));
        this.setBoardWidth(GetValue(o, 'width', 0));
        this.setBoardHeight(GetValue(o, 'height', 0));
        return this;
    }

    boot() {
        if (this.scene && this.isBoard) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene && this.isBoard) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        if (this.isBoard) {
            this.removeAllChess(!fromScene, true);
        } else {

        }

        super.shutdown();
        this.boardData.shutdown(fromScene);

        this.scene = undefined;
        this.boardData = undefined;
        this.isShutdown = true;

        return this;
    }

    destroy(fromScene) {
        if (this.isShutdown) {
            return;
        }
        this.emit('destroy', this, fromScene);
        this.shutdown(fromScene);
    }

    setGrid(grid) {
        if (IsPlainObject(grid)) {
            var config = grid;
            var gridType = GetValue(config, 'gridType', 'quadGrid');
            var grid = new DefaultGrids[gridType](config);
        }
        this.grid = grid;
        return this;
    }

    setWrapMode(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.wrapMode = enable;
        return this;
    }

    setInfinityMode(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.infinityMode = enable;
        return this;
    }

    setBoardSize(width, height) {
        this.setBoardWidth(width);
        this.setBoardHeight(height);
        return this;
    }

    exists(gameObject) {
        // game object or uid
        return this.boardData.exists(this.getChessUID(gameObject));
    }

    get chessCount() {
        return this.boardData.chessCount;
    }

    clear(destroy) {
        if (destroy === undefined) {
            destroy = true;
        }
        this.removeAllChess(destroy, true);
        this.boardData.clear();
        return this;
    }

    static GetBoard(chess) {
        return GetBoard(chess);
    }
}

Object.assign(
    Board.prototype,
    LogicMethods
);

export default Board;
