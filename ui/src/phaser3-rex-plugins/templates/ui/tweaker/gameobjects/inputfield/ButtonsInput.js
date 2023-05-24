import InputFiledBase from './InputFieldBase.js';
import CreateButtons from '../utils/CreateButtons.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';
import CreateLabel from '../../../utils/build/CreateLabel.js';
import { GetOptionIndex } from '../../utils/OptionsMethods.js';
import SetButtonsActiveStateByIndex from '../utils/SetButtonsActiveState.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ButtonsInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ButtonsInput';

        var buttonConfig = (config.button) ? DeepClone(config.button) : {};
        var buttonExpand = GetValue(buttonConfig, 'expand', true);
        if (buttonExpand) {
            buttonConfig.align = 'center';
        }
        delete buttonConfig.expand;

        var list = CreateButtons(scene, {
            expand: buttonExpand
        });
        list.buttonConfig = buttonConfig;

        this.add(
            list,
            { proportion: 1, expand: true }
        );

        this.addChildrenMap('list', list);

        list.on('button.click', function (button, index, pointer, event) {
            var option = list.options[index];
            if (!option) {
                return;  // ??
            }
            this._selectedIndex = index;
            this.setValue(option.value);
            this._selectedIndex = undefined;
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

        var list = this.childrenMap.list;
        var index = this._selectedIndex;  // See list's 'button.click' event
        if (index === undefined) {
            index = GetOptionIndex(list.options, value);
        }
        SetButtonsActiveStateByIndex(list.childrenMap.buttons, index);
        super.value = value;  // Fire 'valuechange' event
    }

    setOptions(options) {
        var list = this.childrenMap.list;
        list.options = options;

        var scene = this.scene;
        var buttonConfig = list.buttonConfig;
        list.clearButtons(true);
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var option = options[i];
            var button = CreateLabel(scene, buttonConfig)
                .setActiveState(false)
                .resetDisplayContent({ text: option.text })

            list.addButton(button);
        }

        return this;
    }
}

export default ButtonsInput;