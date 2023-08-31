import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Fade extends EaseValueTaskBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);

        this.setMode(GetValue(o, 'mode', 0));
        this.setAlphaRange(
            GetAdvancedValue(o, 'start', this.parent.alpha),
            GetAdvancedValue(o, 'end', 0)
        );
        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setAlphaRange(start, end) {
        this.alphaStart = start;
        this.alphaEnd = end;
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        gameObject.setAlpha(this.alphaStart);

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration)
            .setRepeat((this.mode === 2) ? -1 : 0);

        super.start();
        return this;
    }

    updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }

        gameObject.alpha = Linear(this.alphaStart, this.alphaEnd, t);
    }

    complete() {
        super.complete();
        if (this.mode === 1) {
            this.parent.destroy();
            // Will also destroy this behavior
        }
        return this;
    }

}

const MODE = {
    stop: 0,
    destroy: 1,
    yoyo: 2
}

export default Fade;