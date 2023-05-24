import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import {
    SetVelocity
} from '../../utils/arcade/Helpers.js';
import DegToRad from '../../utils/math/DegToRad.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class EightDirection extends TickTask {
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
        this.setDirMode(GetValue(o, 'dir', '8dir'));
        this.setSpeed(GetValue(o, 'speed', 200));
        this.setRotateToDirection(GetValue(o, 'rotateToDirection', false));
        this.setWrapMode(GetValue(o, 'wrap', false), GetValue(o, 'padding', 0));
        this.setCursorKeys(GetValue(o, 'cursorKeys', undefined));
        return this;
    }

    get enable() {
        return this.isRunning;
    }

    set enable(value) {
        this.isRunning = value;
        if (!value) {
            SetVelocity(this, 0, 0);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        if (e && (this.body === undefined)) {
            this.scene.physics.add.existing(this.parent, false);
        }
        return this;
    }

    setDirMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    setRotateToDirection(rotateToDirection) {
        this.rotateToDirection = rotateToDirection;
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
            SetVelocity(gameObject, 0, 0);
            return this;
        }

        if (!gameObject.active) {
            return this;
        }

        var dy = ((this.isUp) ? -1 : 0) + ((this.isDown) ? 1 : 0),
            dx = ((this.isLeft) ? -1 : 0) + ((this.isRight) ? 1 : 0);
        if ((dx === 0) && (dy === 0)) {
            SetVelocity(gameObject, 0, 0);
            return this;
        }
        switch (this.dirMode) {
            case 0: // up&down
                dx = 0;
                break;
            case 1: // left&right
                dy = 0;
                break;
            case 2: // 4dir
                if (dy !== 0) {
                    dx = 0;
                }
                break;
        }

        var rotation, vx, vy;
        if (dy === 0) { // dx !== 0
            vx = this.speed * dx;
            vy = 0;
            rotation = (dx === 1) ? RAD0 : RAD180;
        } else if (dx === 0) { // dy !== 0
            vx = 0;
            vy = this.speed * dy;
            rotation = (dy === 1) ? RAD90 : RAD270;
        } else { // (dx !== 0) && (dy !== 0)
            rotation = Math.atan2(dy, dx);
            vx = this.speed * Math.cos(rotation);
            vy = this.speed * Math.sin(rotation);
        }
        SetVelocity(gameObject, vx, vy);
        if (this.rotateToDirection && (rotation !== undefined)) {
            gameObject.rotation = rotation;
        }

        if (this.wrap) {
            gameObject.body.world.wrap(gameObject, this.padding);
        }
        return this;
    }
}

const DIRMODE = {
    'up&down': 0,
    'left&right': 1,
    '4dir': 2,
    '8dir': 3
};
const RAD0 = DegToRad(0);
const RAD90 = DegToRad(90);
const RAD180 = DegToRad(180);
const RAD270 = DegToRad(270);

export default EightDirection;