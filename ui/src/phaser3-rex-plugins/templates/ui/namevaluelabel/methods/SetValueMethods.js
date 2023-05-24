const Clamp = Phaser.Math.Clamp;

export default {
    setValueTextFormatCallback(callback, scope) {
        this.valueTextFormatCallback = callback;
        this.valueTextFormatCallbackScope = scope;
        return this;
    },

    getFormatValueText(value, min, max) {
        if (value === undefined) {
            value = this.value;
        }
        if (min === undefined) {
            min = this.minValue;
        }
        if (max === undefined) {
            max = this.maxValue;
        }

        var text;
        if (this.valueTextFormatCallbackScope) {
            text = this.valueTextFormatCallback(value, min, max);
        } else {
            text = this.valueTextFormatCallback.call(this.valueTextFormatCallbackScope, value, min, max);
        }
        return text;
    },

    updateValueText(value, min, max) {
        var textObject = this.childrenMap.value;
        if (textObject && this.valueTextFormatCallback) {
            textObject.setText(this.getFormatValueText(value, min, max));
            if (textObject.layout) {
                textObject.layout();
            }
        }
        return this;
    },

    setValue(value, min, max) {
        value = Clamp(value, min, max);
        this.value = value;
        this.minValue = min;
        this.maxValue = max;
        this.updateValueText(value, min, max);
        this.setBarValue(value, min, max);
        return this;
    },
}