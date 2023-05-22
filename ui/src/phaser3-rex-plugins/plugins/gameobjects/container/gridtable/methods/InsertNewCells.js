const Clamp = Phaser.Math.Clamp;

var InsertNewCells = function (cellIdx, count) {
    if (typeof (cellIdx) === 'object') {
        cellIdx = cellIdx.index;
    }
    if (count === undefined) {
        count = 1;
    }
    if (count <= 0) {
        return this;
    }
    cellIdx = Clamp(cellIdx, 0, this.cellsCount);
    this.table.insertNewCells(cellIdx, count);
    return this;
}

export default InsertNewCells;