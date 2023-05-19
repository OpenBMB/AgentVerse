import InputFiledBase from './InputFieldBase.js';
import CreateInputText from '../../../utils/build/CreateInputText.js';

class NumberInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.NumberInput';

        var inputTextConfig = config.inputNumber || config.inputText;
        var inputText = CreateInputText(scene, inputTextConfig)
            .setNumberInput();

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
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

        var text = (this.textFormatCallback) ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        super.value = value;  // Fire 'valuechange' event
    }

    setInputTextReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
    }
}

export default NumberInput;