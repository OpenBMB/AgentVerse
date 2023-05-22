import Clock from '../../clock.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LifeTime extends Clock {
    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.setLifeTime(GetValue(o, 'lifeTime', 1000));
        this.setDestroyMode(GetValue(o, 'destroy', true));
        if (GetValue(o, 'start', true)) {
            this.start();
        }
        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.lifeTime = this.lifeTime;
        return o;
    }

    setLifeTime(time) {
        this.lifeTime = time;
        return this;
    }

    addToLifeTime(time) {
        this.lifeTime += time;
        return this;
    }

    setDestroyMode(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.destroyMode = enable;
        return this;
    }

    get isAlive() {
        return this.now < this.lifeTime;
    }

    get remainder() {
        var remainder = this.lifeTime - this.now;
        if (remainder < 0) {
            remainder = 0;
        }
        return remainder;
    }

    update(time, delta) {
        if (!this.isRunning) {
            return this;
        }

        super.update(time, delta);
        if (!this.isAlive) {
            this.complete();
            if (this.destroyMode) {
                this.gameObject.destroy();
            }
        }
        return this;
    }

    get gameObject() {
        return this.parent;
    }
}

export default LifeTime;