import TouchCursor from '../../touchcursor.js';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class VirtualJoyStick {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        config.eventEmitter = this.getEventEmitter();

        this.scene = scene;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
        this.setRadius(GetValue(config, 'radius', 100));

        this.addBase(GetValue(config, 'base', undefined), config);
        this.addThumb(GetValue(config, 'thumb', undefined));

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        this.base.setPosition(x, y);
        this.thumb.setPosition(x, y);

        if (GetValue(config, 'fixed', true)) {
            this.setScrollFactor(0);
        }

        this.boot();
    }

    destroy() {
        this.destroyEventEmitter();
        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb.destroy();

        this.scene = undefined;
        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
    }

    createCursorKeys() {
        return this.touchCursor.createCursorKeys();
    }

    get forceX() {
        return this.touchCursor.forceX;
    }

    get forceY() {
        return this.touchCursor.forceY;
    }

    get force() {
        return this.touchCursor.force;
    }

    get rotation() {
        return this.touchCursor.rotation;
    }

    get angle() {
        return this.touchCursor.angle; // -180 ~ 180
    }

    get up() {
        return this.touchCursor.upKeyDown;
    }

    get down() {
        return this.touchCursor.downKeyDown;
    }

    get left() {
        return this.touchCursor.leftKeyDown;
    }

    get right() {
        return this.touchCursor.rightKeyDown;
    }

    get noKey() {
        return this.touchCursor.noKeyDown;
    }

    get pointerX() {
        return this.touchCursor.end.x;
    }

    get pointerY() {
        return this.touchCursor.end.y;
    }

    get pointer() {
        return this.touchCursor.pointer;
    }

    setPosition(x, y) {
        if ((this.x === x) && (this.y === y)) {
            return this;
        }

        this.x = x;
        this.y = y;

        this.forceUpdateThumb();
        return this;
    }

    set x(value) {
        if (this.x === value) {
            return;
        }
        this.base.x = value;
        this.thumb.x = value;
    }

    set y(value) {
        if (this.y === value) {
            return;
        }
        this.base.y = value;
        this.thumb.y = value;
    }

    get x() {
        return this.base.x;
    }

    get y() {
        return this.base.y;
    }

    setVisible(visible) {
        this.visible = visible;
        return this;
    }

    toggleVisible() {
        this.visible = !this.visible;
        return this;
    }

    get visible() {
        return this.base.visible;
    }

    set visible(visible) {
        this.base.visible = visible;
        this.thumb.visible = visible;
    }

    get enable() {
        return this.touchCursor.enable;
    }

    set enable(value) {
        this.touchCursor.setEnable(value);
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

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    addBase(gameObject, config) {
        if (this.base) {
            this.base.destroy();
            // Also destroy touchCursor behavior
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, this.radius)
                .setStrokeStyle(3, 0x0000ff);
        }

        if (config === undefined) {
            config = {};
        }
        config.eventEmitter = this.getEventEmitter();
        this.touchCursor = new TouchCursor(gameObject, config)
        this.base = gameObject;
        return this;
    }

    addThumb(gameObject) {
        if (this.thumb) {
            this.thumb.destroy();
        }

        if (gameObject === undefined) {
            gameObject = this.scene.add.circle(0, 0, 40)
                .setStrokeStyle(3, 0x00ff00);
        }
        this.thumb = gameObject;
        return this;
    }

    setScrollFactor(scrollFactor) {
        this.base.setScrollFactor(scrollFactor);
        this.thumb.setScrollFactor(scrollFactor);
        return this;
    }

    boot() {
        this.on('update', this.update, this);
    }

    // Internal method
    update() {
        var touchCursor = this.touchCursor;
        // Start from (0,0)
        var x = this.base.x;
        var y = this.base.y;
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) { // Exceed radius
                var rad = touchCursor.rotation;
                x += Math.cos(rad) * this.radius;
                y += Math.sin(rad) * this.radius;
            } else {
                x += touchCursor.forceX;
                y += touchCursor.forceY;
            }
        }
        this.thumb.x = x;
        this.thumb.y = y
        return this;
    }

    forceUpdateThumb() {
        this.touchCursor.forceUpdate();
        return this;
    }
}

Object.assign(
    VirtualJoyStick.prototype,
    EventEmitterMethods
);

export default VirtualJoyStick;