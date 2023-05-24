import InputFiledBase from './InputFieldBase.js';
import CreateColorInput from '../../../utils/build/CreateColorInput.js';

class ColorInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ColorInput';

        var colorInputConfig = config.colorInput;
        var colorInput = CreateColorInput(scene, colorInputConfig);

        this.add(
            colorInput,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('colorInput', colorInput);

        colorInput.on('valuechange', function (value) {
            this.setValue(value);
        }, this);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }
        if (!this.validate(value)) {
            value = this._value;  // Back to previous value
        }

        this.childrenMap.colorInput.setValue(value);
        super.value = value;  // Fire 'valuechange' event
    }
}

export default ColorInput;