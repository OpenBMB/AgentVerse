var UpdateTable = function (refresh) {
    if (refresh === undefined) {
        refresh = false;
    }
    if (refresh) {
        ClearVisibleCellIndexes.call(this);
        this.hideCells();
    }
    ClearVisibleCellIndexes.call(this);
    this.showCells();
    this.hideCells();

    this.setMaskChildrenFlag();
    return this;
}

var ClearVisibleCellIndexes = function () {
    var tmp = this.preVisibleCells;
    this.preVisibleCells = this.visibleCells;
    this.visibleCells = tmp;
    this.visibleCells.clear();
}

export default UpdateTable;