const GetValue = Phaser.Utils.Objects.GetValue;

class MaxDelta {
    constructor(config) {
        this.logCallback = GetValue(config, 'logCallback', DefaultCallback);
        this.logCallbackScope = GetValue(config, 'logCallbackScope', undefined);
        this.clear();
        this.setEnable(GetValue(config, 'enable', true));
    }

    clear() {
        this.prevTime = undefined;
        this.maxDelta = undefined;
        return this;
    }

    setEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.enable = enabled;
        return this;
    }

    log(time) {
        if (!this.enable) {
            return this;
        }

        if (this.prevTime === undefined) {
            this.prevTime = time;
            this.maxDelta = 0;
        } else {
            var dt = time - this.prevTime;
            this.prevTime = time;
            if (this.maxDelta < dt) {
                this.maxDelta = dt;

                if (this.logCallback) {
                    if (this.logCallbackScope) {
                        this.logCallback.call(this.logCallbackScope, dt);
                    } else {
                        this.logCallback(dt);
                    }
                }
            }
        }

        return this;
    }
}

var DefaultCallback = function (dt) {
    console.log(dt);
}

export default MaxDelta;