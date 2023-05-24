import TimerTask from '../timerticktask/TimerTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

class EaseValueTaskBase extends TimerTask {
    resetFromJSON(o) {
        this.timer.resetFromJSON(GetValue(o, 'timer'));
        this.setEnable(GetValue(o, 'enable', true));
        this.setTarget(GetValue(o, 'target', this.parent));
        this.setDelay(GetAdvancedValue(o, 'delay', 0));
        this.setDuration(GetAdvancedValue(o, 'duration', 1000));
        this.setEase(GetValue(o, 'ease', 'Linear'));
        this.setRepeat(GetValue(o, 'repeat', 0));

        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;
        return this;
    }

    setTarget(target) {
        if (target === undefined) {
            target = this.parent;
        }
        this.target = target;
        return this;
    }

    setDelay(time) {
        this.delay = time;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
    }

    setDuration(time) {
        this.duration = time;
        return this;
    }

    setRepeat(repeat) {
        this.repeat = repeat;
        // Assign `this.timer.setRepeat(repeat)` manually
        return this;
    }

    setRepeatDelay(repeatDelay) {
        this.repeatDelay = repeatDelay;
        // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
        return this;
    }

    setEase(ease) {
        if (ease === undefined) {
            ease = 'Linear';
        }
        this.ease = ease;
        this.easeFn = GetEaseFunction(ease);
        return this;
    }

    // Override
    start() {
        // Ignore start if timer is running, i.e. in DELAY, o RUN state
        if (this.timer.isRunning) {
            return this;
        }

        super.start();
        return this;
    }

    restart() {
        this.timer.stop();
        this.start.apply(this, arguments);
        return this;
    }

    stop(toEnd) {
        if (toEnd === undefined) {
            toEnd = false;
        }

        super.stop();

        if (toEnd) {
            this.timer.setT(1);
            this.updateGameObject(this.target, this.timer);
            this.complete();
        }

        return this;
    }

    update(time, delta) {
        if (
            (!this.isRunning) ||
            (!this.enable) ||
            (!this.parent.active)
        ) {
            return this;
        }

        var target = this.target,
            timer = this.timer;

        timer.update(time, delta);

        // isDelay, isCountDown, isDone
        if (!timer.isDelay) {
            this.updateGameObject(target, timer);
        }

        this.emit('update', target, this);

        if (timer.isDone) {
            this.complete();
        }

        return this;
    }

    // Override
    updateGameObject(target, timer) {

    }
}

export default EaseValueTaskBase;