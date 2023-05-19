import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';
import SpeedMonitor from '../../utils/speedmonitor/SpeedMonitor.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Vector2 = Phaser.Math.Vector2;
const Distance = Phaser.Math.Distance.Between;
const AngleBetweenPoint = Phaser.Math.Angle.BetweenPoints;

class Interception extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this._target = undefined;
        this.mySpeedMonitor = new SpeedMonitor();
        this.targetSpeedMonitor = new SpeedMonitor();
        this.predictedPosition = new Vector2();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.setEnable(GetValue(o, 'enable', true));
        this.setTarget(GetValue(o, 'target', undefined));
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            duration: this.duration,
            tickingMode: this.tickingMode
        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.setTarget();

        super.shutdown(fromScene);
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    get target() {
        return this._target;
    }

    set target(target) {
        if (target == null) {
            target = undefined;
        }

        if (this.target === target) {
            // Do nothing
        } else {
            // Remove previous target
            if (this.target) {
                this.target.off('destroy', this.onTargetDestroy, this);
            }

            // Add new target
            if (target) {
                target.once('destroy', this.onTargetDestroy, this);
            }
            this._target = target;
        }

        if (this.isRunning) {
            if (this.target === undefined) {
                super.stop();
            }
        } else { // !this.isRunning
            if (this.target !== undefined) {
                // Start speed monitor
                this.mySpeedMonitor.init(this.parent.x, this.parent.y);
                this.targetSpeedMonitor.init(this.target.x, this.target.y);
                super.start();
            }
        }
        return this;
    }

    setTarget(target) {
        this.target = target;
        return this;
    }

    onTargetDestroy(target, fromScene) {
        this.setTarget();
        return this;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        if (this.target === undefined) {
            return this;
        } else if (!this.enable) {
            this.predictedPosition.copy(this.target);
            return this;
        }

        var gameObject = this.parent;
        delta /= 1000; // delta in sec
        this.mySpeedMonitor.update(gameObject.x, gameObject.y, delta);
        this.targetSpeedMonitor.update(this.target.x, this.target.y, delta);

        var relatedVelocityX = this.targetSpeedMonitor.velocity.x - this.mySpeedMonitor.velocity.x;
        var relatedVelocityY = this.targetSpeedMonitor.velocity.y - this.mySpeedMonitor.velocity.y;
        if ((relatedVelocityX === 0) && (relatedVelocityY === 0)) {
            // Target and mine is moving parallelly
            this.predictedPosition.copy(this.target);
        } else {
            var relatedSpeed = Distance(0, 0, relatedVelocityX, relatedVelocityY);
            var distanceToTarget = Distance(this.target.x, this.target.y, gameObject.x, gameObject.y);
            var time = distanceToTarget / relatedSpeed;
            this.predictedPosition.set(
                this.target.x + (this.targetSpeedMonitor.velocity.x * time),
                this.target.y + (this.targetSpeedMonitor.velocity.y * time),
            )
        }
        return this;
    }

    get predictedAngle() {
        return AngleBetweenPoint(this.parent, this.predictedPosition);
    }
}

export default Interception;