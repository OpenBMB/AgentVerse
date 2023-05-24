var PointToCellIndex = function (x, y) {
    y -= (this.y + this.topLeftY);
    x -= (this.x + this.topLeftX);
    var offsetTableOY = this.tableOY - ((this.scrollMode === 0) ? y : x);
    var offsetTableOX = this.tableOX - ((this.scrollMode === 0) ? x : y);

    var table = this.table;
    var rowIdx = table.heightToRowIndex(-offsetTableOY, 0);
    var colIdx = table.widthToColIndex(-offsetTableOX);
    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    if (cellIdx === null) {
        return null;
    }
    if (!this.isCellVisible(cellIdx)) {
        return null;
    }
    return cellIdx;
}

var PointToCellContainer = function (x, y) {
    var cellIdx = PointToCellIndex.call(this, x, y);
    if (cellIdx === null) {
        return undefined;
    }
    return this.getCellContainer(cellIdx);
}

export { PointToCellIndex, PointToCellContainer };