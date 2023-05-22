import Tap from '../../tap/Tap.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TapCell = function (table, tableConfig) {
    var tapConfig = GetValue(tableConfig, 'tap', undefined);
    if (tapConfig === false) {
        return;
    }

    table._tap = new Tap(table, tapConfig);
    table._tap
        .on('tap', function (tap, gameObject, lastPointer) {
            var eventName = `cell.${tap.tapsCount}tap`
            EmitCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.worldX, tap.worldY, lastPointer);
        }, this)
};

export default TapCell;