import Press from '../../press/Press.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var PressCell = function (table, tableConfig) {
    var pressConfig = GetValue(tableConfig, 'press', undefined);
    if (pressConfig === false) {
        return;
    }

    table._press = new Press(table, pressConfig);
    table._press
        .on('pressstart', function (press, gameObject, lastPointer) {
            EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, press.worldX, press.worldY, lastPointer);
        }, this)
        .on('pressend', function (press, gameObject, lastPointer) {
            EmitCellEvent(this.eventEmitter, 'cell.pressend', table, press.worldX, press.worldY, lastPointer);
        }, this)
};

export default PressCell;