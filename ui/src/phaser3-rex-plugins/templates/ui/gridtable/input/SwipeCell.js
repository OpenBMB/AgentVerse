import Swipe from '../../swipe/Swipe.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SwipeCell = function (table, tableConfig) {
    var swipeConfig = GetValue(tableConfig, 'swipe', undefined);
    if (swipeConfig === false) {
        return;
    } else if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    swipeConfig.dir = '4dir';
    table._swipe = new Swipe(table, swipeConfig);
    table._swipe
        .on('swipe', function (swipe, gameObject, lastPointer) {
            var dirName =
                (swipe.left) ? 'left' :
                    (swipe.right) ? 'right' :
                        (swipe.up) ? 'up' :
                            'down';
            EmitCellEvent(this.eventEmitter, `cell.swipe${dirName}`, table, swipe.worldX, swipe.worldY, lastPointer);
        }, this)
};

export default SwipeCell;