import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Rotate extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.setSpeed(GetValue(o, 'speed', 180));
        return this;
    }

    toJSON() {
        return {
            enable: this.isRunning,
            timeScale: this.timeScale,
            speed: this.speed,
            tickingMode: this.tickingMode
        };
    }

    get enable() {
        return this.isRunning;
    }

    set enable(enable) {
        if (enable) {
            this.start();
        } else {
            this.stop();
        }
    }

    setEnable(enable) {
        if (enable == undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        if ((this.speed === 0) || (delta === 0) || (this.timeScale === 0)) {
            return this;
        }

        var dt = (delta * this.timeScale) / 1000;
        gameObject.angle += this.speed * dt;
        return this;
    }
}

export default Rotate;