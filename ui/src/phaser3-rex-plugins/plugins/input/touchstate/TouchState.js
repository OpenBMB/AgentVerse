import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import GetTickDelta from '../../utils/system/GetTickDelta.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DistanceBetween = Phaser.Math.Distance.Between;

class TouchState extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._enable = undefined;
        this.parent.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.pointer = undefined;
        this.isInTouching = false;
        this.x = undefined;
        this.y = undefined;
        this.preX = undefined;
        this.preY = undefined;
        this.justMoved = false;
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        var gameObject = this.parent;
        gameObject.on('pointerdown', this.onPointIn, this);
        gameObject.on('pointerover', this.onPointIn, this);
        gameObject.on('pointerup', this.onPointOut, this);
        gameObject.on('pointerout', this.onPointOut, this);
        gameObject.on('pointermove', this.onPointerMove, this);
        this.scene.sys.events.on('postupdate', this.postupdate, this);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // GameObject events will be removed when this gameObject destroyed 
        // this.parent.off('pointerdown', this.onPointIn, this);
        // this.parent.off('pointerover', this.onPointIn, this);
        // this.parent.off('pointerup', this.onPointOut, this);
        // this.parent.off('pointerout', this.onPointOut, this);
        // this.parent.off('pointermove', this.onPointerMove, this);
        this.scene.sys.events.off('postupdate', this.postupdate, this);

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
            this.isInTouching = false;
            this.pointer = undefined;
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

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    get isDown() {
        return this.pointer && this.pointer.isDown;
    }

    get isUp() {
        return this.pointer === undefined;
    }

    get dx() {
        return this.x - this.preX;
    }

    get dy() {
        return this.y - this.preY;
    }

    get dt() {
        var delta = GetTickDelta(this.scene);
        return delta;
    }

    get speed() {
        if ((this.x === this.preX) && (this.y === this.preY)) {
            return 0;
        }
        var d = DistanceBetween(this.x, this.preX, this.y, this.preY);
        var speed = d / (this.dt * 0.001);
        return speed;
    }

    get speedX() {
        return this.dx / (this.dt * 0.001);
    }

    get speedY() {
        return this.dy / (this.dt * 0.001);
    }

    // internal
    onPointIn(pointer, localX, localY, event) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== undefined)) {
            return;
        }
        this.pointer = pointer;
        this.isInTouching = true;
        this.preX = pointer.x;
        this.preY = pointer.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.emit('touchstart', this, this.parent, pointer, localX, localY, event);
    }

    onPointOut(pointer) {
        if ((!this.enable) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.pointer = undefined;
        this.isInTouching = false;
        this.emit('touchend', this, this.parent, pointer);
    }

    onPointerMove(pointer, localX, localY, event) {
        if ((!this.enable) ||
            (!pointer.isDown) ||
            (this.pointer !== pointer)) {
            return;
        }
        this.preX = this.x;
        this.preY = this.y;
        this.x = pointer.x;
        this.y = pointer.y;
        this.localX = localX;
        this.localY = localY;
        this.justMoved = true;
        this.emit('touchmove', this, this.parent, pointer, localX, localY, event);
    }

    postupdate(time, delta) {
        this.justMoved = false;
    }

}

export default TouchState;