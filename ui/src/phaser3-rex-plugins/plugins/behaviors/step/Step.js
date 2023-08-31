import TickTask from '../../utils/componentbase/SceneUpdateTickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Step extends TickTask {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setEnable(GetValue(o, 'enable', true));
        this.setStepLength(GetValue(o, 'stepLength', 5));
    }

    toJSON() {
        return {
            enable: this.enable,

        };
    }

    get enable() {
        return this._enable;
    }

    set enable(value) {
        value = !!value;
        if (this._enable === value) {
            return this;
        }

        this._enable = value;
        this.isRunning = value;

        if (value) {
            var gameObject = this.parent;
            this.preX = gameObject.x;
            this.preY = gameObject.y;
        }
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        }
        this.enable = e;

        return this;
    }

    setStepLength(stepLength) {
        this.stepLength = stepLength;
        return this;
    }

    cancelStep() {
        this.cancelStepFlag = true;
        return this;
    }

    update(time, delta) {
        if (!this.enable) {
            return this;
        }

        var gameObject = this.parent;
        if (!gameObject.active) {
            return this;
        }

        var x0 = this.preX,
            y0 = this.preY,
            x1 = gameObject.x,
            y1 = gameObject.y;

        if ((x0 === x1) && (y0 === y1)) {
            return this;
        }

        this.cancelStepFlag = false;

        this.step(x0, y0, x1, y1, this.stepLength);

        this.preX = x1;
        this.preY = y1;
        return this;
    }

    step(x0, y0, x1, y1, stepLength) {
        if (this.cancelStepFlag) {
            return this;
        }

        var dx = x1 - x0,
            dy = y1 - y0;
        var d = Math.sqrt(dx * dx + dy * dy);

        var steps = Math.round(d / stepLength);
        if (steps === 0) {
            steps = 1;
        }

        var stepX = dx / steps,
            stepY = dy / steps;
        var xt, yt;
        var gameObject = this.parent;
        var points = [];
        for (var i = 1; i <= steps; i++) {
            xt = x0 + (stepX * i);
            yt = y0 + (stepY * i);
            points.push({ x: xt, y: yt });

            this.emit('step', gameObject, this, xt, yt);

            if (this.cancelStepFlag) {
                break;
            }
        }

        this.emit('steps', gameObject, this, points);

        return this;
    }

}

var StepMode = {
    linear: 0,
    'x,y': 1,
    'h,v': 1,
    'y,x': 2,
    'v,h': 2
}

export default Step;