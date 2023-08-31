import Press from '../../press/Press.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var PressChild = function (config) {
    var pressConfig = GetValue(config, 'press', undefined);
    if (pressConfig === false) {
        return;
    } else if (pressConfig === true) {
        pressConfig = undefined;
    }

    var childrenInteractive = this._childrenInteractive;
    this._press = new Press(this, pressConfig);
    this._press
        .on('pressstart', function (press, gameObject, lastPointer) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}pressstart`,
                childrenInteractive.targetSizers,
                press.worldX, press.worldY,
                lastPointer
            );
        }, this)
        .on('pressend', function (press, gameObject, lastPointer) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}pressend`,
                childrenInteractive.targetSizers,
                press.worldX, press.worldY,
                lastPointer
            );
        }, this)
};

export default PressChild;