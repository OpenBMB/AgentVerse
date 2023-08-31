import Sizer from '../../sizer/Sizer.js';
import IsGameObject from '../../../../plugins/utils/system/IsGameObject.js';
import CreateLabel from '../../utils/build/CreateLabel.js';
import CreateInputText from '../../utils/build/CreateInputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Color = Phaser.Display.Color;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;
const HSVToRGB = Phaser.Display.Color.HSVToRGB;
const Clamp = Phaser.Math.Clamp;

class ColorComponents extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 0;
        super(scene, config);
        this.type = 'rexColorComponents';

        this.colorObject = new Color();

        // Add elements
        var background = GetValue(config, 'background', undefined);

        var formatLabel = GetValue(config, 'formatLabel', undefined);
        if (!IsGameObject(formatLabel)) {
            formatLabel = CreateLabel(scene, formatLabel)
                .resetDisplayContent();
        }

        var components = [];
        if (config.inputText0 && config.inputText1 && config.inputText2) {
            components.push(config.inputText0);
            components.push(config.inputText1);
            components.push(config.inputText2);
        } else {
            var inputTextConfig = GetValue(config, 'inputText');
            for (var i = 0; i < 3; i++) {
                var inputText = CreateInputText(scene, inputTextConfig)
                    .setMaxLength(3)
                    .setNumberInput()

                components.push(inputText);
            }
        }

        if (background) {
            this.addBackground(background);
        }

        var proportion = GetValue(config, 'proportion.formatLabel', 0);
        var defaultExpand = (formatLabel.isRexContainerLite) ? true : false;
        var expand = GetValue(config, 'expand.formatLabel', defaultExpand);
        this.add(
            formatLabel,
            { proportion: proportion, expand: expand }
        );

        var proportion = (GetValue(inputTextConfig, 'width') === undefined) ? 1 : 0;
        var expand = (GetValue(inputTextConfig, 'height') === undefined) ? true : false;
        for (var i = 0, cnt = components.length; i < cnt; i++) {
            this.add(
                components[i],
                { proportion: proportion, expand: expand }
            )
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('formatLabel', formatLabel);
        this.addChildrenMap('components', components);

        this.onClick(formatLabel, this.toggleColorFormat, this);

        for (var i = 0, cnt = components.length; i < cnt; i++) {
            components[i].on('close', function () {
                this.updateColorObject();
                this.setValue(this.colorObject.color);
            }, this);
        }

        var callback = GetValue(config, 'valuechangeCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'valuechangeCallbackScope', undefined);
            this.on('valuechange', callback, scope);
        }

        formatLabel.setText('RGB');
        this.setValue(GetValue(config, 'value', 0xffffff));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(Math.floor(value), 0, 0xffffff);

        if (this._value === value) {
            return;
        }

        this._value = value;

        this.colorObject.setFromRGB(ColorToRGBA(value));
        this.updateComponents();

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

    get colorFormat() {
        return this.childrenMap.formatLabel.text;
    }

    set colorFormat(value) {
        if (this.colorFormat === value) {
            return;
        }
        this.childrenMap.formatLabel.setText(value);
        this.updateComponents();
    }

    setColorFormat(colrType) {
        this.colorFormat = colrType;
        return this;
    }

    toggleColorFormat() {
        this.colorFormat = (this.colorFormat === 'RGB') ? 'HSV' : 'RGB';
        return this;
    }

    updateComponents() {
        var components = this.childrenMap.components;
        var value0, value1, value2
        if (this.colorFormat === 'RGB') {
            value0 = this.colorObject.red;
            value1 = this.colorObject.green;
            value2 = this.colorObject.blue;
        } else { // colorFormat === 'HSV'
            value0 = Math.floor(this.colorObject.h * 360);
            value1 = Math.floor(this.colorObject.s * 100);
            value2 = Math.floor(this.colorObject.v * 100);
        }

        components[0].setValue(value0);
        components[1].setValue(value1);
        components[2].setValue(value2);
        return this;
    }

    updateColorObject() {
        var components = this.childrenMap.components;
        if (this.colorFormat === 'RGB') {
            var red = Clamp(components[0].value, 0, 255);
            var green = Clamp(components[1].value, 0, 255);
            var blue = Clamp(components[2].value, 0, 255);
            this.colorObject.setTo(red, green, blue);
        } else {
            var h = Clamp(components[0].value, 0, 359) / 360;
            var s = Clamp(components[1].value, 0, 100) / 100;
            var v = Clamp(components[2].value, 0, 100) / 100;
            this.colorObject.setFromRGB(HSVToRGB(h, s, v));
        }
        return this;
    }
}

export default ColorComponents;