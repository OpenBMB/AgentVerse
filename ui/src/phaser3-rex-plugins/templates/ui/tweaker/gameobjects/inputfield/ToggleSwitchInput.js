import InputFiledBase from './InputFieldBase.js';
import CreateToggleSwitch from '../utils/CreateToggleSwitch.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ToggleSwitchInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.ToggleSwitchInput';

        var toggleSwitchConfig = config.toggleSwitch;
        var toggleSwitch = CreateToggleSwitch(scene, toggleSwitchConfig);

        var size = GetValue(toggleSwitchConfig, 'size');
        if (size !== undefined) {
            toggleSwitch.setSize(size, size);
        }

        var fitRatio = (size !== undefined) ? 0 : 1;

        this
            .addSpace()
            .add(
                toggleSwitch,
                { proportion: 0, expand: false, fitRatio: fitRatio }
            )

        this.addChildrenMap('toggleSwitch', toggleSwitch);

        toggleSwitch.on('valuechange', function (value) {
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

        this.childrenMap.toggleSwitch.setValue(value);
        super.value = value;  // Fire 'valuechange' event
    }
}

export default ToggleSwitchInput;