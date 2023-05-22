import Sizer from '../../sizer/Sizer.js';
import CreateSwatch from './methods/CreateSwatch.js';
import CreateInputText from '../../utils/build/CreateInputText.js';
import ColorStringToInteger from '../../../../plugins/utils/color/ColorStringToInteger.js';
import GetHexColorString from '../../../../plugins/utils/color/GetHexColorString.js';
import SetSwatchColor from './methods/SetSwatchColor.js';
import ResizeGameObject from '../../../../plugins/utils/size/ResizeGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const Clamp = Phaser.Math.Clamp;

class ColorInput extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorInputLite';

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var swatchConfig = GetValue(config, 'swatch');
        var swatchSize;
        if (IsPlainObject(swatchConfig)) {
            swatchSize = GetValue(swatchConfig, 'size');
        }
        var swatch = CreateSwatch(scene, GetValue(config, 'swatch'));

        var inputTextConfig = GetValue(config, 'inputText', true);
        var inputText;
        if (inputTextConfig) {
            inputText = CreateInputText(scene, inputTextConfig);
        }

        if (background) {
            this.addBackground(background);
        }

        if (swatch) {
            swatchSize = GetValue(config, 'swatchSize', swatchSize);
            var squareExpandSwatch;
            if (swatchSize !== undefined) {
                ResizeGameObject(swatch, swatchSize, swatchSize);
                squareExpandSwatch = false;
            } else {
                squareExpandSwatch = GetValue(config, 'squareExpandSwatch', true);
            }

            var fitRatio = (squareExpandSwatch) ? 1 : 0;
            this.add(
                swatch,
                { proportion: 0, expand: false, fitRatio: fitRatio }
            );
        }

        if (inputText) {
            var proportion = (GetValue(inputTextConfig, 'width') === undefined) ? 1 : 0;
            var expand = (GetValue(inputTextConfig, 'height') === undefined) ? true : false;
            this.add(
                inputText,
                { proportion: proportion, expand: expand }
            )
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('swatch', swatch);
        this.addChildrenMap('inputText', inputText);


        if (inputText) {
            inputText.on('close', function () {
                this.setValue(inputText.value);
            }, this);
        }

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        this.setValue(GetValue(config, 'value', 0x0));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof (value) === 'string') {
            value = ColorStringToInteger(value);
            if (value == null) {
                var inputText = this.childrenMap.inputText;
                if (inputText) {
                    inputText.setText(GetHexColorString(this._value));
                }
                return;
            }
        } else {
            value = Clamp(Math.floor(value), 0, 0xffffff);
        }

        if (this._value === value) {
            return;
        }

        this._value = value;

        var swatch = this.childrenMap.swatch;
        if (swatch) {
            SetSwatchColor(swatch, value);
        }

        var inputText = this.childrenMap.inputText;
        if (inputText) {
            inputText.setText(GetHexColorString(value));
        }

        this.emit('valuechange', this._value);
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get color() {
        return this._value;
    }

    set color(color) {
        this.value = color;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

}

export default ColorInput;