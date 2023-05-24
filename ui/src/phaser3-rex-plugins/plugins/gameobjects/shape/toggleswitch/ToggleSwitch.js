import ToggleSwitchShape from './ToggleSwitchShape.js';
import Click from '../../../input/button/Button.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class ToggleSwitch extends ToggleSwitchShape {
    constructor(scene, x, y, width, height, color, config) {
        super(scene, x, y, width, height, color, config);

        this._click = new Click(this, GetValue(config, 'click'));
        this._click.on('click', function () {
            this.toggleValue();
        }, this);

        this.setReadOnly(GetValue(config, 'readOnly', false));
    }

    get readOnly() {
        return !this._click.enable;
    }

    set readOnly(value) {
        this._click.enable = !value;
    }

    setReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return this;
    }
}

export default ToggleSwitch;