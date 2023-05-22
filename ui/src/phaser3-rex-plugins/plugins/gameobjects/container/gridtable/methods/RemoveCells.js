import HideCell from './updatetable/HideCell.js';

var RemoveCells = function (cellIdx, count) {
    if (typeof (cellIdx) === 'object') {
        cellIdx = cellIdx.index;
    }
    if (count === undefined) {
        count = 1;
    }
    if (cellIdx < 0) {
        count += cellIdx;
        cellIdx = 0;
    }
    if (count <= 0) {
        return this;
    }
    // out-of-range
    if (cellIdx > this.cellsCount) {
        return this;
    }

    var cell;
    for (var i = cellIdx, endIdx = cellIdx + count; i < endIdx; i++) {
        cell = this.getCell(i, false);
        if (cell) {
            if (this.visibleCells.contains(cell)) {
                HideCell.call(this, cell);
                this.visibleCells.delete(cell);
            }
            this.preVisibleCells.delete(cell);
        }
    }

    this.table.removeCells(cellIdx, count);
    return this;
}

export default RemoveCells;