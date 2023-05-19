const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class Timer {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.state = GetValue(o, 'state', IDLE);
        this.timeScale = GetValue(o, 'timeScale', 1);
        this.delay = GetValue(o, 'delay', 0);
        this.repeat = GetValue(o, 'repeat', 0);
        this.repeatCounter = GetValue(o, 'repeatCounter', 0);
        this.repeatDelay = GetValue(o, 'repeatDelay', 0);
        this.duration = GetValue(o, 'duration', 0);
        this.nowTime = GetValue(o, 'nowTime', 0);
        this.justRestart = GetValue(o, 'justRestart', false);
    }

    toJSON() {
        return {
            state: this.state,
            timeScale: this.timeScale,
            delay: this.delay,
            repeat: this.repeat,
            repeatCounter: this.repeatCounter,
            repeatDelay: this.repeatDelay,
            duration: this.duration,
            nowTime: this.nowTime,
            justRestart: this.justRestart,
        }
    }

    destroy() {

    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    setDelay(delay) {
        if (delay === undefined) {
            delay = 0;
        }
        this.delay = delay;
        return this;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    setRepeat(repeat) {
        this.repeat = repeat;
        return this;
    }

    setRepeatInfinity() {
        this.repeat = -1;
        return this;
    }

    setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        return this;
    }

    start() {
        this.nowTime = (this.delay > 0) ? -this.delay : 0;
        this.state = (this.nowTime >= 0) ? COUNTDOWN : DELAY;
        this.repeatCounter = 0;
        return this;
    }

    stop() {
        this.state = IDLE;
        return this;
    }

    update(time, delta) {
        if (this.state === IDLE || this.state === DONE ||
            delta === 0 || this.timeScale === 0
        ) {
            return;
        }

        this.nowTime += (delta * this.timeScale);
        this.justRestart = false;
        if (this.nowTime >= this.duration) {
            if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
                this.repeatCounter++;
                this.justRestart = true;
                this.nowTime -= this.duration;
                if (this.repeatDelay > 0) {
                    this.nowTime -= this.repeatDelay;
                    this.state = REPEATDELAY;
                }
            } else {
                this.nowTime = this.duration;
                this.state = DONE;
            }
        } else if (this.nowTime >= 0) {
            this.state = COUNTDOWN;
        }
    }

    get t() {
        var t;
        switch (this.state) {
            case IDLE:
            case DELAY:
            case REPEATDELAY:
                t = 0;
                break;

            case COUNTDOWN:
                t = this.nowTime / this.duration;
                break;

            case DONE:
                t = 1;
                break;
        }
        return Clamp(t, 0, 1);
    }

    set t(value) {
        value = Clamp(value, -1, 1);
        if (value < 0) {
            this.state = DELAY;
            this.nowTime = -this.delay * value;
        } else {
            this.state = COUNTDOWN;
            this.nowTime = this.duration * value;

            if ((value === 1) && (this.repeat !== 0)) {
                this.repeatCounter++;
            }
        }
    }

    setT(t) {
        this.t = t;
        return this;
    }

    get isIdle() {
        return this.state === IDLE;
    }

    get isDelay() {
        return this.state === DELAY;
    }

    get isCountDown() {
        return this.state === COUNTDOWN;
    }

    get isRunning() {
        return this.state === DELAY || this.state === COUNTDOWN;
    }

    get isDone() {
        return this.state === DONE;
    }

    get isOddIteration() {
        return (this.repeatCounter & 1) === 1;
    }

    get isEvenIteration() {
        return (this.repeatCounter & 1) === 0;
    }

}

const IDLE = 0;
const DELAY = 1;
const COUNTDOWN = 2;
const REPEATDELAY = 3;
const DONE = -1;

export default Timer;