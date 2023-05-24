import TickTask from '../../../utils/componentbase/TickTask.js';
import GetSceneObject from '../../../utils/system/GetSceneObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class OnePointerTracer extends TickTask {
    constructor(gameObject, config) {
        var scene = GetSceneObject(gameObject);
        if (scene === gameObject) {
            gameObject = undefined;
        }
        super(scene, config);

        this.gameObject = gameObject;
        if (gameObject) {
            gameObject.setInteractive(GetValue(config, "inputConfig", undefined));
        }
        this._enable = undefined;
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));

        this.setDetectBounds()
        if (this.gameObject === undefined) {
            this.setDetectBounds(GetValue(o, 'bounds', undefined));
        } else {
            this.setDetectBounds();
        }

        this.tracerState = TOUCH0;
        // this.recongizedState = new stateClass(this);
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;
        this.isTouchingAnyObject = false;
        return this;
    }

    boot() {
        super.boot();
        if (this.gameObject) {
            this.gameObject.on('pointerdown', this.onPointerDown, this);
        } else {
            this.scene.input.on('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.on('pointerup', this.onPointerUp, this);
        this.scene.input.on('gameout', this.dragCancel, this);

        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown(fromScene) {
        if (!this.scene) {
            return
        }

        if (this.gameObject) {
            // GameObject events will be removed when this gameObject destroyed 
            // this.gameObject.off('pointerdown', this.onPointerDown, this);
        } else {
            this.scene.input.off('pointerdown', this.onPointerDown, this);
        }
        this.scene.input.off('pointerup', this.onPointerUp, this);
        this.scene.input.off('gameout', this.dragCancel, this);

        this.scene.input.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('shutdown', this.destroy, this);

        this.gameObject = undefined;
        this.bounds = undefined;
        this.pointer = undefined;
        this.lastPointer = undefined; // Last catched pointer
        this.movedState = false;

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
            this.dragCancel();
        }
        this._enable = e;
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    setDetectBounds(bounds) {
        this.bounds = bounds;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    onPointerDown(pointer, gameObjects) {
        if (!this.enable) {
            return;
        }

        if (this.pointer !== undefined) {
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        if (this.pointer === pointer) {
            return;
        }

        this.pointer = pointer;
        this.lastPointer = pointer;
        this.movedState = false;
        this.tracerState = TOUCH1;

        if (this.gameObject === undefined) {
            this.isTouchingAnyObject = (gameObjects.length > 0);
        }
        this.onDragStart();
    }

    onPointerUp(pointer) {
        if (!this.enable) {
            return;
        }

        var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
        if (!isInsideBounds) {
            return;
        }

        if (this.pointer !== pointer) {
            return;
        }

        this.pointer = undefined;
        this.movedState = false;
        this.tracerState = TOUCH0;
        this.onDragEnd();
    }

    onPointerMove(pointer) {
        if (!this.enable) {
            return;
        }

        if (pointer.isDown) {
            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            var isCatchedPointer = (this.pointer === pointer);
            if (!isCatchedPointer && isInsideBounds) { // Pointer moves into bounds
                // this.onPointerDown(pointer);
            } else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds
                this.onPointerUp(pointer);
            } else { // Pointer drags in bounds
                if (!this.movedState) {
                    this.movedState = (pointer.x !== pointer.downX) || (pointer.y !== pointer.downY);
                }
                if (this.movedState) {
                    this.onDrag();
                }
            }
        } else {
            // var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            // var isLastCatchedPointer = (this.lastPointer === pointer);
            // if (isLastCatchedPointer && isInsideBounds) {
            //     this.onLastPointerMove();
            // }
        }
    }

    dragCancel() {
        if (this.tracerState === TOUCH1) {
            this.onDragEnd();
        }
        this.pointer = undefined;
        this.tracerState = TOUCH0;
        return this;
    }

    onDragStart() {
        this.emit('dragstart', this);
    }

    onDragEnd() {
        this.emit('dragend', this);
    }

    onDrag() {
        this.emit('drag', this);
    }

    // onLastPointerMove() { }

    preUpdate(time, delta) { }

    postUpdate(time, delta) { }

    startTicking() {
        super.startTicking();
        this.scene.sys.events.on('preupdate', this.preUpdate, this);
        this.scene.sys.events.on('postupdate', this.postUpdate, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            this.scene.sys.events.off('preupdate', this.preUpdate, this);
            this.scene.sys.events.off('postupdate', this.postUpdate, this);
        }
    }

    setRecongizedStateObject(stateObject) {
        this.recongizedState = stateObject;
        return this;
    }

    get state() {
        return this.recongizedState.state;
    }

    set state(newState) {
        this.recongizedState.state = newState;
    }

    cancel() {
        this.state = IDLE;
        return this;
    }
}

const TOUCH0 = 0;
const TOUCH1 = 1;

const IDLE = 'IDLE';

export default OnePointerTracer;