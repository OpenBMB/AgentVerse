import Button from '../../../../plugins/input/button/Button.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ClickCell = function (table, tableConfig) {
    var buttonConfig = GetValue(tableConfig, 'click', undefined);
    if (buttonConfig === false) {
        return;
    } else if (buttonConfig === undefined) {
        buttonConfig = {};
    }
    buttonConfig.threshold = 10;
    table._click = new Button(table, buttonConfig);
    table._click.on('click', function (button, gameObject, pointer, event) {
        EmitCellEvent(this.eventEmitter, 'cell.click', gameObject, pointer.worldX, pointer.worldY, pointer, event);
    }, this);
};

export default ClickCell;