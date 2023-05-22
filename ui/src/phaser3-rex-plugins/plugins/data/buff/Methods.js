import Buff from '../../utils/buff/Buff.js';
import MinMaxBounds from '../../utils/minmaxbounds/MinMaxBounds.js';

export default {
    setBaseValue(key, value) {
        this.baseValues[key] = value;
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBaseValue(key) {
        if (this.baseValues.hasOwnProperty(key)) {
            delete this.baseValues[key];
            this.remove(key);
        }
        return this;
    },

    setBuff(key, buffKey, value) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].set(buffKey, value);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    enableBuff(key, buffKey, enable) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].setEnable(buffKey, enable);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBuff(key, buffKey) {
        if (this.buffs.hasOwnProperty(key)) {
            if (buffKey === undefined) {
                delete this.buffs[key];
            } else {
                this.buffs[key].remove(buffKey);
            }
        }
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setMin(key, min) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setMax(key, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setBounds(key, min, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min).setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    getBuffResult(key) {
        return this.clamp(key, this.buff(key));
    },

    buff(key, baseValue) {
        if (baseValue === undefined) {
            baseValue = this.getBaseValue(key);
        }
        if (!this.buffs.hasOwnProperty(key)) {
            return baseValue;
        }
        return this.buffs[key].buff(baseValue);
    },

    clamp(key, value) {
        if (value === undefined) {
            value = this.list[key];
        }
        if (!this.bounds.hasOwnProperty(key)) {
            return value;
        }
        return this.bounds[key].clamp(value);
    },

    getBaseValue(key) {
        if (!this.baseValues.hasOwnProperty(key)) {
            this.baseValues[key] = 0;
        }
        return this.baseValues[key];
    },

    getBuffs(key, buffKey) {
        var buffs = this.buffs[key];
        if (buffKey === undefined) {
            return buffs;
        }
        if (buffs && buffs.hasOwnProperty(buffKey)) {
            return buffs[buffKey];
        }

        return undefined;
    },

    getBuffValue(key, buffKey) {
        return this.getBuffs(key, buffKey).value
    },

    getBounds(key) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        return this.bounds[key];
    },

    getMinBound(key) {
        return this.getBounds(key).min;
    },

    getMaxBound(key) {
        return this.getBounds(key).max;
    }
};