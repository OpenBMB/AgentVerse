import EaseValueTaskBase from '../../utils/componentbase/tweentask/EaseValueTaskBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Linear = Phaser.Math.Linear;

class EaseMove extends EaseValueTaskBase {
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

        if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
            var endX = GetAdvancedValue(o, 'x', undefined);
            var endY = GetAdvancedValue(o, 'y', undefined);
            this.setTargetPosition(endX, endY);
        } else {
            this.setTargetPosition(o);
        }

        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this.mode = m;
        return this;
    }

    setTargetPosition(x, y) {
        if ((typeof (x) === 'number') || (typeof (y) === 'number')) {
            // endX, endY
            // x,y : a number, or undefined
            this.startX = this.parent.x;
            this.startY = this.parent.y;
            this.endX = x;
            this.endY = y;
        } else {
            var config = x;
            this.startX = GetAdvancedValue(config, 'startX', undefined);
            this.startY = GetAdvancedValue(config, 'startY', undefined);
            this.endX = GetAdvancedValue(config, 'endX', undefined);
            this.endY = GetAdvancedValue(config, 'endY', undefined);
        }

        this.hasMoveX = (this.startX !== undefined) && (this.endX !== undefined);
        this.hasMoveY = (this.startY !== undefined) && (this.endY !== undefined);
        return this;
    }

    start() {
        if (this.timer.isRunning) {
            return this;
        }

        var gameObject = this.parent;
        if (this.hasMoveX) {
            gameObject.x = this.startX;
        }
        if (this.hasMoveY) {
            gameObject.y = this.startY;
        }

        this.timer
            .setDelay(this.delay)
            .setDuration(this.duration)
            .setRepeat((this.mode === 2) ? -1 : 0);

        super.start();
        return this;
    }

    updateGameObject(gameObject, timer) {
        var t = timer.t;
        if (timer.isOddIteration) {   // Yoyo
            t = 1 - t;
        }
        t = this.easeFn(t);

        if (this.hasMoveX) {
            gameObject.x = Linear(this.startX, this.endX, t);
        }
        if (this.hasMoveY) {
            gameObject.y = Linear(this.startY, this.endY, t);
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

export default EaseMove;