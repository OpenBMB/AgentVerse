import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class Scale extends EaseValueTaskBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;
        // this.timer

        this.scaleStart = {};
        this.scaleEnd = {};

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);

        this.setMode(GetValue(o, 'mode', 0));
        this.setScaleRange(
            GetAdvancedValue(o, 'start', undefined),
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

    setScaleRange(start, end) {
        if (typeof (start) === 'number') {
            this.startX = start;
            this.startY = start;
        } else {
            this.startX = GetAdvancedValue(start, 'x', this.parent.scaleX);
            this.startY = GetAdvancedValue(start, 'y', this.parent.scaleY);
        }
        if (typeof (end) === 'number') {
            this.endX = end;
            this.endY = end;
        } else {
            this.endX = GetAdvancedValue(end, 'x', undefined);
            this.endY = GetAdvancedValue(end, 'y', undefined);
        }

        this.hasScaleX = (this.startX !== undefined) && (this.endX !== undefined);
        this.hasScaleY = (this.startY !== undefined) && (this.endY !== undefined);
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (this.hasScaleX) {
            gameObject.scaleX = this.startX;
        }
        if (this.hasScaleY) {
            gameObject.scaleY = this.startY;
        }

        var repeat = this.repeat;
        if (this.mode === 2) {  // Yoyo
            if (repeat !== -1) {
                repeat = ((repeat + 1) * 2) - 1;
            }
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration)
            .setRepeat(repeat);

        super.start();
        return this;
    }

    updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {  // Yoyo
            t = 1 - t;
        }
        t = this.easeFn(t);

        if (this.hasScaleX) {
            gameObject.scaleX = Linear(this.startX, this.endX, t);
        }
        if (this.hasScaleY) {
            gameObject.scaleY = Linear(this.startY, this.endY, t);
        }
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

export default Scale;