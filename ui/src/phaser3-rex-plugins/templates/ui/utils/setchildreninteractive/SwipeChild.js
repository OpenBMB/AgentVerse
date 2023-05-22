import Swipe from '../../swipe/Swipe.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SwipeChild = function (config) {
    var swipeConfig = GetValue(config, 'swipe', undefined);
    if (swipeConfig === false) {
        return;
    } else if (swipeConfig === true) {
        swipeConfig = undefined;
    }

    if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    if (!swipeConfig.hasOwnProperty('dir')) {
        swipeConfig.dir = '4dir';
    }

    var childrenInteractive = this._childrenInteractive;
    this._swipe = new Swipe(this, swipeConfig);
    this._swipe
        .on('swipe', function (swipe, gameObject, lastPointer) {
            var dirName =
                (swipe.left) ? 'left' :
                    (swipe.right) ? 'right' :
                        (swipe.up) ? 'up' :
                            'down';
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}swipe${dirName}`,
                childrenInteractive.targetSizers,
                swipe.worldX, swipe.worldY,
                lastPointer
            );
        }, this)
};

export default SwipeChild;