// https://labs.phaser.io/view.html?src=src\physics\arcade\asteroids%20movement.js

import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import { SetAcceleration, SetAngularVelocity } from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Ship extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        if (!this.parent.body) {
            this.scene.physics.add.existing(this.parent, false);
        }
        this.setEnable(GetValue(o, 'enable', true));
        this.setMaxSpeed(GetValue(o, 'maxSpeed', 200));
        this.setAcceleration(GetValue(o, 'acceleration', 200));
        this.setDrag(GetValue(o, 'drag', 0.99));
        this.setTurnSpeed(GetValue(o, 'turnSpeed', 300));
        this.setWrapMode(GetValue(o, 'wrap', true), GetValue(o, 'padding', 0));
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
        return this;
    }

    get enable() {
        return this.isRunning;
    }

    set enable(value) {
        this.isRunning = value;
        if (!value) {
            SetAcceleration(this.parent, 0, 0);
            SetAngularVelocity(this.parent, 0);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    get maxSpeed() {
        return this._maxSpeed;
    }

    set maxSpeed(value) {
        this._maxSpeed = value;
        var body = this.parent.body;
        body.setMaxSpeed(value);
    }

    setMaxSpeed(speed) {
        this.maxSpeed = speed;
        return this;
    }

    setAcceleration(acceleration) {
        this.acceleration = acceleration;
        return this;
    }

    get drag() {
        return this._drag;
    }

    set drag(value) {
        this._drag = value;
        var body = this.parent.body;
        body.setDrag(value);
        body.useDamping = true;
    }

    setDrag(drag) {
        this.drag = drag;
        return this;
    }

    setTurnSpeed(angularVelocity) {
        this.angularVelocity = angularVelocity;
        return this;
    }

    setWrapMode(wrap, padding) {
        if (wrap === undefined) {
            wrap = true;
        }
        this.wrap = wrap;
        this.padding = padding;
        return this;
    }

    setCursorKeys(cursorKeys) {
        if (cursorKeys === undefined) {
            cursorKeys = this.scene.input.keyboard.createCursorKeys();
        }
        this.cursorKeys = cursorKeys;
        return this;
    }

    get isLeft() {
        return (this.enable) ? this.cursorKeys.left.isDown : false;
    }

    get isRight() {
        return (this.enable) ? this.cursorKeys.right.isDown : false;
    }

    get isUp() {
        return (this.enable) ? this.cursorKeys.up.isDown : false;
    }

    get isDown() {
        return (this.enable) ? this.cursorKeys.down.isDown : false;
    }

    update(time, delta) {
        var gameObject = this.parent;
        if (!this.enable) {
            SetAcceleration(gameObject, 0, 0);
            SetAngularVelocity(gameObject, 0);
            return this;
        }

        if (!gameObject.active) {
            return this;
        }

        // Speed up
        if (this.isUp) {
            var rotation = gameObject.rotation;
            var ax = Math.cos(rotation) * this.acceleration;
            var ay = Math.sin(rotation) * this.acceleration;
            SetAcceleration(gameObject, ax, ay);
        } else {
            SetAcceleration(gameObject, 0, 0);
        }

        // Turn left/right
        var dx = ((this.isLeft) ? -1 : 0) + ((this.isRight) ? 1 : 0);
        SetAngularVelocity(gameObject, this.angularVelocity * dx);

        if (this.wrap) {
            gameObject.body.world.wrap(gameObject, this.padding);
        }
    }
}

export default Ship;