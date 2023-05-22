import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import { SetVelocity } from '../../utils/arcade/Helpers.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class Bullet extends TickTask {
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
        this.setWrapMode(GetValue(o, 'wrap', false), GetValue(o, 'padding', 0));
        this.setEnable(GetValue(o, 'enable', true));
        this.setSpeed(GetValue(o, 'speed', 200));

        var angle = GetValue(o, 'angle');
        if (angle !== undefined) {
            this.setAngle(angle);
            var rotation = GetValue(o, 'rotation');
            if (rotation !== undefined) {
                this.setRotation(rotation);
            }
        }

        return this;
    }

    get enable() {
        return this.isRunning;
    }

    set enable(value) {
        this.isRunning = value;
        if (!value) {
            SetVelocity(this.parent, 0, 0);
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
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

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

    setRotation(rotation) {
        this.rotation = rotation;
        return this;
    }

    set angle(value) {
        if (typeof (value) === 'number') {
            value = DegToRad(value);
        }
        this.rotation = value;
    }

    get angle() {
        var value = this.rotation;
        if (typeof (value) === 'number') {
            value = RadToDeg(value);
        }
        return value;
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

        var rotation = this.rotation;
        if (rotation == null) {
            rotation = gameObject.rotation;
        }
        var vx = this.speed * Math.cos(rotation);
        var vy = this.speed * Math.sin(rotation);
        SetVelocity(gameObject, vx, vy);

        if (this.wrap) {
            gameObject.body.world.wrap(gameObject, this.padding);
        }

        return this;
    }
}

export default Bullet;