const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class MinMaxBounds {
    constructor(min, max) {
        if (IsPlainObject(min)) {
            var config = min;
            min = GetValue(config, 'min', undefined);
            max = GetValue(config, 'max', undefined);
        }
        this.setMin(min);
        this.setMax(max);
    }

    setMin(value) {
        this.min = value;
        return this;
    }

    setMax(value) {
        this.max = value;
        return this;
    }

    clamp(value) {
        if ((this.min !== undefined) && (value < this.min)) {
            value = this.min;
        } else if ((this.max !== undefined) && (value > this.max)) {
            value = this.max;
        }
        return value;
    }
}

export default MinMaxBounds;