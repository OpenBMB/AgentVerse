import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import DegToRad from '../../utils/math/DegToRad.js';
import RadToDeg from '../../utils/math/RadToDeg.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const MathWrap = Phaser.Math.Wrap;
const WrapAngle = Phaser.Math.Angle.Wrap;
const AngleBetween = Phaser.Math.Angle.Between;


class RotateTo extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 180));
        this.target = GetValue(o, 'target', 0);
        this.dir = GetValue(o, 'dir', 0);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            timeScale: this.timeScale,
            speed: this.speed,
            target: this.target,
            dir: this.dir,
            tickingMode: this.tickingMode
        };
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

    rotateTo(angle, dir, speed) {
        if (typeof (angle) !== 'number') {
            var config = angle;
            angle = GetValue(config, 'angle', undefined);
            dir = GetValue(config, 'dir', undefined);
        }
        this.target = MathWrap(angle, 0, 360); // 0~360
        if (dir === undefined) {
            dir = 0;
        }
        this.dir = (typeof (dir) === 'string') ? DIRMODE[dir] : dir;
        if (speed !== undefined) {
            this.setSpeed(speed);
        }
        super.start();
        this.emit('start', this.parent, this);
        return this;
    }

    rotateTowardsPosition(x, y, dir, speed) {
        var gameObject = this.parent;
        var rad = AngleBetween(gameObject.x, gameObject.y, x, y);
        var angle = RadToDeg(rad);
        this.rotateTo(angle, dir, speed);
        return this;
    }

    update(time, delta) {
        if ((!this.isRunning) || (!this.enable)) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        var target = this.target; // 0~360
        var targetRad = WrapAngle(DegToRad(target)); // -PI~PI
        if (targetRad === gameObject.rotation) {
            this.complete();
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var curAngle = (360 + gameObject.angle) % 360; // 0~360
        var dt = (delta * this.timeScale) / 1000;
        var movingDist = this.speed * dt;
        var distToTarget, dir = this.dir;
        switch (dir) {
            case 0: // shotest
                var distCW = diffAngle(curAngle, target, true);
                var distCCW = 360 - distCW;
                if (distCW < distCCW) {
                    dir = 1;
                    distToTarget = distCW;
                } else {
                    dir = 2;
                    distToTarget = distCCW;
                }
                break;
            case 1: // cw
                distToTarget = diffAngle(curAngle, target, true);
                break;
            case 2: // ccw
                distToTarget = diffAngle(curAngle, target, false);
                break;
        }

        var newAngle;
        if (movingDist < distToTarget) {
            newAngle = (dir === 1) ? (curAngle + movingDist) : (curAngle - movingDist);
        } else {
            newAngle = target;
        }

        gameObject.rotation = DegToRad(newAngle);
        return this;
    }
}

var diffAngle = function (a0, a1, cw) {
    var diff = (cw) ? (a1 - a0) : (a0 - a1);
    diff = MathWrap(diff, 0, 360);
    return diff;
}

const DIRMODE = {
    shortest: 0,
    cw: 1,
    ccw: 2
}
export default RotateTo;