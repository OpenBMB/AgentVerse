var SetCellsCount = function (count) {
    var cellsCount = this.cellsCount;
    if (cellsCount === count) {
        return this;
    }

    if (cellsCount > count) {
        this.removeCells(count, cellsCount - count);
    } else { // cellsCount < count
        this.insertNewCells(cellsCount, count - cellsCount);
    }
    return this;
}

export default SetCellsCount;