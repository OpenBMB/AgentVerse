import Button from '../../../../plugins/input/button/Button.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ClickChild = function (config) {
    var clickConfig = GetValue(config, 'click', undefined);
    if (clickConfig === false) {
        return;
    } else if (clickConfig === true) {
        clickConfig = undefined;
    }

    if (clickConfig === undefined) {
        clickConfig = {};
    }
    if (!clickConfig.hasOwnProperty('threshold')) {
        clickConfig.threshold = 10;
    }

    var childrenInteractive = this._childrenInteractive;
    this._click = new Button(this, clickConfig);
    this._click.on('click', function (button, gameObject, pointer, event) {
        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}click`,
            childrenInteractive.targetSizers,
            pointer.worldX, pointer.worldY,
            pointer, event
        );
    }, this);
};

export default ClickChild;