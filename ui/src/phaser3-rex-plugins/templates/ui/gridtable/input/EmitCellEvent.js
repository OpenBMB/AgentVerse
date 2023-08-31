var EmitCellEvent = function (eventEmitter, eventName, table, x, y, pointer, event) {
    var cellIndex;
    if (y === undefined) {
        cellIndex = x;
    } else {
        cellIndex = table.pointToCellIndex(x, y);
    }
    if ((cellIndex === null) || (cellIndex === undefined)) {
        return;
    }
    var cellContainer = table.getCellContainer(cellIndex);
    if (cellContainer) {
        eventEmitter.emit(eventName, cellContainer, cellIndex, pointer, event);
    }
}

export default EmitCellEvent;