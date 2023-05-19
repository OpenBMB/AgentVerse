import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import RequestDrag from '../../utils/input/RequestDrag.js'

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;
const RotateAroundDistance = Phaser.Math.RotateAroundDistance;

class Drag extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this._enable = undefined;
        gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.setEnable(GetValue(o, "enable", true));
        this.setAxisMode(GetValue(o, "axis", 0));
        this.setAxisRotation(GetValue(o, "rotation", 0));
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            axis: this.axisMode,
            rotation: this.axisRotation
        };
    }

    boot() {
        var gameObject = this.parent;
        gameObject.on('dragstart', this.onDragStart, this);
        gameObject.on('drag', this.onDrag, this);
        gameObject.on('dragend', this.onDragEnd, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.on('dragstart', this.onDragStart, this);
        // this.parent.on('drag', this.onDrag, this);
        // this.parent.on('dragend', this.onDragEnd, this);
        this.pointer = undefined;

        super.shutdown(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.dragend();
        }
        this._enable = e;
        this.scene.input.setDraggable(this.parent, e);
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setAxisMode(m) {
        if (typeof (m) === 'string') {
            m = DIRECTIONNODE[m];
        }
        this.axisMode = m;
        return this;
    }

    setAxisRotation(a) {
        this.axisRotation = a;
        return this;
    }

    drag() {
        RequestDrag(this.parent);
        return this;
    }

    dragend() {
        if (!this.isDragging) {
            return;
        }
        this.scene.input.setDragState(this.pointer, 5);
        return this;
    }

    onDragStart(pointer, dragX, dragY) {
        if (this.isDragging) {
            return;
        }
        this.pointer = pointer;
    }

    onDrag(pointer, dragX, dragY) {
        if (this.pointer !== pointer) {
            return;
        }
        var gameObject = this.parent;
        if (this.axisMode === 0) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        } else if (this.axisRotation === 0) {
            if (this.axisMode === 1) {
                gameObject.x = dragX;
            } else if (this.axisMode === 2) {
                gameObject.y = dragY;
            }
        } else {
            var dist;
            var p1 = { x: dragX, y: dragY };
            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, -this.axisRotation, dist);

            if (this.axisMode === 1) {
                p1.y = gameObject.y;
            } else if (this.axisMode === 2) {
                p1.x = gameObject.x;
            }
            dist = DistanceBetween(p1.x, p1.y, gameObject.x, gameObject.y);
            p1 = RotateAroundDistance(p1, gameObject.x, gameObject.y, this.axisRotation, dist);

            gameObject.x = p1.x;
            gameObject.y = p1.y;
        }

    }

    onDragEnd(pointer, dragX, dragY, dropped) {
        if (this.pointer !== pointer) {
            return;
        }
        this.pointer = undefined;
    }

    get isDragging() {
        return (this.pointer !== undefined);
    }
}

const DIRECTIONNODE = {
    'both': 0,
    'h&v': 0,
    'x&y': 0,
    'horizontal': 1,
    'h': 1,
    'x': 1,
    'vertical': 2,
    'v': 2,
    'y': 2
};


export default Drag;