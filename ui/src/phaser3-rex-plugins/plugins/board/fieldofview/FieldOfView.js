import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import Methods from './Methods.js';
import GetChessData from '../chess/GetChessData.js';
import CONST from './const.js';
import DegToRad from '../../utils/math/DegToRad.js';
import AngleNormalize from '../../utils/math/angle/Normalize.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import GetValue from '../../utils/object/GetValue.js';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

class FieldOfView extends ComponentBase {
    constructor(gameObject, config) {
        if (IsPlainObject(gameObject)) {
            config = gameObject;
            gameObject = undefined;
        }

        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.setChess(gameObject);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        // Pre-test
        var occupiedTest = GetValue(o, 'occupiedTest', false);
        var blockerTest = GetValue(o, 'blockerTest', false);
        var edgeBlockerTest = GetValue(o, 'edgeBlockerTest', false); // Unsupport now
        var preTestCallback = GetValue(o, 'preTestCallback', undefined);
        var preTestCallbackScope = GetValue(o, 'preTestCallbackScope', undefined);
        // Cost of each tile
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', undefined);
        }

        this.setFace(GetValue(o, 'face', 0));
        this.setConeMode(GetValue(o, 'coneMode', 0));
        this.setCone(GetValue(o, 'cone', undefined));
        this.setOccupiedTest(occupiedTest);
        this.setBlockerTest(blockerTest);
        this.setEdgeBlockerTest(edgeBlockerTest);
        this.setPreTestFunction(preTestCallback, preTestCallbackScope);
        this.setCostFunction(costCallback, costCallbackScope);
        this.setPerspectiveEnable(GetValue(o, 'perspective', false));
        this.setDebugGraphics(GetValue(o, 'debug.graphics', undefined));
        this.setDebugLineColor(GetValue(o, 'debug.visibleLineColor', 0x00ff00), GetValue(o, 'debug.invisibleLineColor', 0xff0000));
        this.setDebugLog(GetValue(o, 'debug.log', false));
        return this;
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.debugGraphics = undefined;
        this.chessData = undefined;

        super.shutdown(fromScene);
    }

    setChess(gameObject) {
        if (gameObject) {
            this.chessData = GetChessData(gameObject);
            if (this.parent !== gameObject) {
                // Remove attatched event from previous gameObject
                if (this.parent && this.parent.once) {
                    this.parent.off('destroy', this.onParentDestroy, this);
                }
                // Attach event
                this.setParent(gameObject);
                if (this.parent && this.parent.once) {
                    this.parent.once('destroy', this.onParentDestroy, this);
                }
            }
        } else {
            this.setParent();
            this.chessData = undefined;
        }
        return this;
    }

    get face() {
        return this._face;
    }

    set face(direction) {
        if (!this.chessData) {
            if (this._face === undefined) {
                this._face = 0;
            }
            return;
        }

        direction = this.board.grid.directionNormalize(direction);
        this._face = direction;
        if (this.coneMode === 0) { // Direction
            // Do nothing
        } else { // Angle
            var angle = this.board.angleToward(this.chessData.tileXYZ, direction); // -PI~PI
            this.faceAngle = AngleNormalize(angle); // 0~2PI
        }
    }

    setFace(direction) {
        this.face = direction;
        return this;
    }

    get cone() {
        return this._cone;
    }

    set cone(value) {
        this._cone = value;

        if (value !== undefined) {
            if (this.coneMode === 0) { // Direction
            } else { // Angle
                this.coneRad = DegToRad(value);
            }
        }
    }

    setConeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = CONEMODE[mode];
        }
        this.coneMode = mode;
        return this;
    }

    setCone(value) {
        this.cone = value;
        return this;
    }

    setOccupiedTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
    }

    setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    setPreTestFunction(callback, scope) {
        this.preTestCallback = callback;
        this.preTestCallbackScope = scope;
        return this;
    }

    setPerspectiveEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.perspectiveEnable = enable;
        return this;
    }

    setDebugGraphics(graphics) {
        this.debugGraphics = graphics;
        return this;
    }

    setDebugLineColor(visibleLineColor, invisibleLineColor) {
        this.debugVisibleLineColor = visibleLineColor;
        this.debugInvisibleLineColor = invisibleLineColor;
        return this;
    }

    setDebugLog(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.debugLog = enabled;
        return this;
    }

    clearDebugGraphics() {
        if (this.debugGraphics) {
            this.debugGraphics.clear();
        }
        return this;
    }

    get BLOCKER() {
        return BLOCKER;
    }

    get INFINITY() {
        return INFINITY;
    }

    get board() {
        return this.chessData.board;
    }
}

const CONEMODE = {
    direction: 0,
    angle: 1,
};

Object.assign(
    FieldOfView.prototype,
    Methods
);

export default FieldOfView;