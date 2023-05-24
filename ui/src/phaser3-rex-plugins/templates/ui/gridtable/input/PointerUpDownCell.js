import EmitCellEvent from './EmitCellEvent.js';

var PointerUpDownCell = function (table, tableConfig) {
    table
        .on('pointerdown', function (pointer, localX, localY, event) {
            EmitCellEvent(this.eventEmitter, 'cell.down', table, pointer.worldX, pointer.worldY, pointer, event);
        }, this)
        .on('pointerup', function (pointer, localX, localY, event) {
            EmitCellEvent(this.eventEmitter, 'cell.up', table, pointer.worldX, pointer.worldY, pointer, event);
        }, this)
}

export default PointerUpDownCell;