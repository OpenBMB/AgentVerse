import TickTask from '../../utils/componentbase/TickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class BaseClock extends TickTask {
    constructor(parent, config) {
        super(parent, config);

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = GetValue(o, 'isRunning', false);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.now = GetValue(o, 'now', 0);
        return this;
    }

    toJSON() {
        return {
            isRunning: this.isRunning,
            timeScale: this.timeScale,
            now: this.now,
            tickingMode: this.tickingMode
        };
    }

    // Override
    // startTicking() { }

    // Override
    // stopTicking() {}

    start(startAt) {
        if (startAt === undefined) {
            startAt = 0;
        }
        this.delta = 0;
        this.now = startAt;
        super.start();
        return this;
    }

    seek(time) {
        this.now = time;
        return this;
    }

    setTimeScale(value) {
        this.timeScale = value;
        return this;
    }

    tick(delta) {
        delta *= this.timeScale;
        this.now += delta;
        this.delta = delta;
        this.emit('update', this.now, this.delta);
        return this;
    }
}

export default BaseClock;