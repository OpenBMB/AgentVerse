import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import State from './State.js';
import DrapSpeed from '../../dragspeed.js';
import SlowDown from '../../utils/movement/SlowDown.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class Scroller extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        var enable = GetValue(config, 'enable', true);
        this._state = new State(this, {
            enable: enable,
            eventEmitter: false,
        });

        var drapSpeedConfig = {
            inputConfig: GetValue(config, 'inputConfig', undefined),
            enable: enable,
            pointerOutRelease: GetValue(config, 'pointerOutRelease', true),
            eventEmitter: false,
        };
        this.dragState = new DrapSpeed(gameObject, drapSpeedConfig);

        this._enable = undefined;
        this._value = undefined;
        this._slowDown = new SlowDown();

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }
        callback = GetValue(config, 'overmaxCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'overmaxCallbackScope', undefined);
            this.on('overmax', callback, scope);
        }
        callback = GetValue(config, 'overminCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'overminCallbackScope', undefined);
            this.on('overmin', callback, scope);
        }

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setOrientationMode(GetValue(o, 'orientation', 0));
        this.setDragThreshold(GetValue(o, 'threshold', 10));
        this.setSlidingDeceleration(GetValue(o, 'slidingDeceleration', 5000));
        this.setBackDeceleration(GetValue(o, 'backDeceleration', 2000));

        var dragRate = GetValue(o, 'dragRate', 1);
        dragRate = dragRate * (GetValue(o, 'dragReverse', false) ? -1 : 1);
        this.setDragRate(dragRate);

        var bounds = GetValue(o, 'bounds', undefined);
        if (bounds) {
            this.setBounds(bounds);
        } else {
            this.setBounds(GetValue(o, 'max', 0), GetValue(o, 'min', 0));
        }
        this.setValue(GetValue(o, 'value', this.maxValue || 0));
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        this.scene.sys.events.on('preupdate', this._state.update, this._state);
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.scene.sys.events.off('preupdate', this._state.update, this._state);
        this._state.destroy(fromScene);
        this.dragState.destroy(fromScene);
        this._state = undefined;
        this.dragState = undefined;

        super.shutdown(fromScene);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        this._enable = e;
        this._state.setEnable(e);
        this.dragState.setEnable(e);

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

    setOrientationMode(m) {
        if (typeof (m) === 'string') {
            m = ORIENTATIONMODE[m];
        }
        this.orientationMode = m;
        return this;
    }

    setDragThreshold(distance) {
        this.dragThreshold = distance;
        return this;
    }

    setSlidingDeceleration(dec) {
        this.slidingDeceleration = dec;
        return this;
    }

    setBackDeceleration(dec) {
        this.backDeceleration = dec;
        return this;
    }

    setDragRate(ratio) {
        this.dragRate = ratio;
        return this;
    }

    setBounds(value0, value1) {
        if (Array.isArray(value0)) {
            var bounds = value0;
            value0 = bounds[0];
            value1 = bounds[1];
        }
        if (value0 < value1) {
            this.minValue = value0;
            this.maxValue = value1;
        } else {
            this.minValue = value1;
            this.maxValue = value0;
        }
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (value === this._value) {
            return;
        }

        var oldValue = this._value;
        var isOverMax = this.overMax(value);
        var isOverMin = this.overMin(value);
        if (isOverMax) {
            this.emit('overmax', value, oldValue);
        }
        if (isOverMin) {
            this.emit('overmin', value, oldValue);
        }
        if (!this.backEnable) {
            if (isOverMax) {
                value = this.maxValue;
            }
            if (isOverMin) {
                value = this.minValue;
            }
        }

        this._value = value;
        this.emit('valuechange', value, oldValue);
    }

    setValue(value, clamp) {
        if (clamp === undefined) {
            clamp = false;
        }

        if (clamp) {
            value = Clamp(value, this.minValue, this.maxValue);
        }

        this.value = value;
        return this;
    }

    addValue(inc, clamp) {
        this.setValue(this.value + inc, clamp);
        return this;
    }

    get state() {
        return this._state.state;
    }

    get isDragging() {
        return this.dragState.isInTouched;
    }

    get outOfMaxBound() {
        return this.overMax(this.value);
    }

    get outOfMinBound() {
        return this.overMin(this.value);
    }

    get outOfBounds() {
        return this.outOfMinBound || this.outOfMaxBound;
    }

    // internal
    overMax(value) {
        return (this.maxValue != null) && (value > this.maxValue);
    }

    overMin(value) {
        return (this.minValue != null) && (value < this.minValue);
    }

    get backEnable() {
        return (typeof (this.backDeceleration) === 'number');
    }

    get isPullBack() {
        return this._slowDown.isMoving;
    }

    get slidingEnable() {
        return (typeof (this.slidingDeceleration) === 'number');
    }

    get isSliding() {
        return this._slowDown.isMoving;
    }

    get dragDelta() {
        var delta;
        if (this.orientationMode === 0) { // y
            delta = this.dragState.dy;
        } else if (this.orientationMode === 1) { // x
            delta = this.dragState.dx;
        } else {
            delta = 0;
        }
        delta *= this.dragRate;
        return delta;
    }

    get dragSpeed() {
        var speed;
        if (this.orientationMode === 0) { // y
            speed = this.dragState.speedY;
        } else if (this.orientationMode === 1) { // x
            speed = this.dragState.speedX;
        } else {
            speed = 0;
        }
        speed *= this.dragRate;
        return speed;
    }

    // enter_DRAG
    onDragStart() {
        this.emit('dragstart');
    }

    // exit_DRAG
    onDragEnd() {
        this.emit('dragend');
    }

    // everyTick_DRAG
    dragging() {
        this.value += this.dragDelta;
    }

    // enter_SLIDE 
    onSliding() {
        var start = this.value;
        var speed = this.dragSpeed;
        if (speed === 0) {
            this._slowDown.stop();
            this._state.next();
            return;
        }
        var dec = this.slidingDeceleration;
        this._slowDown.init(start, (speed > 0), Math.abs(speed), dec)
    }

    // everyTick_SLIDE
    sliding(time, delta) {
        delta *= 0.001;
        var newValue = this._slowDown.update(delta).value;
        if (this.overMax(newValue)) {
            this.value = this.maxValue;
            this._slowDown.stop();
        } else if (this.overMin(newValue)) {
            this.value = this.minValue;
            this._slowDown.stop();
        } else {
            this.value = newValue;
        }
    }

    // enter_BACK
    onPullBack() {
        var start = this.value;
        var end = (this.outOfMinBound) ? this.minValue : this.maxValue;
        var dist = Math.abs(end - start);
        var dec = this.backDeceleration;
        var speed = Math.sqrt(2 * dec * dist);
        this._slowDown.init(start, undefined, speed, dec, end);
    }

    // everyTick_BACK
    pullBack(time, delta) {
        delta *= 0.001;
        this.value = this._slowDown.update(delta).value;

        if (!this._slowDown.isMoving) {
            this._state.next();
        }
    }

    // exit_SLIDE, exit_BACK
    stop() {
        this._slowDown.stop();
    }

}

const ORIENTATIONMODE = {
    y: 0,
    v: 0,
    vertical: 0,
    x: 1,
    h: 1,
    horizontal: 1,
};

export default Scroller;