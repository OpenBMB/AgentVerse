import Tap from '../../tap/Tap.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TapChild = function (config) {
    var tapConfig = GetValue(config, 'tap', undefined);
    if (tapConfig === false) {
        return;
    } else if (tapConfig === true) {
        tapConfig = undefined;
    }

    var childrenInteractive = this._childrenInteractive;
    this._tap = new Tap(this, tapConfig);
    this._tap
        .on('tap', function (tap, gameObject, lastPointer) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}${tap.tapsCount}tap`,
                childrenInteractive.targetSizers,
                tap.worldX, tap.worldY,
                lastPointer
            );
        }, this)
};

export default TapChild;