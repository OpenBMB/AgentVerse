var SetGridSize = function (colCount, rowCount) {
    this.setCellsCount(colCount * rowCount);
    this.table.setColumnCount(colCount);
    return this;
}

export default SetGridSize;