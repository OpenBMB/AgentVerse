var ShowCells = function () {
    if (this.cellsCount === 0) {
        return;
    }
    var table = this.table;

    var startRowIdx = table.heightToRowIndex(-this.tableOY);
    if (startRowIdx <= 0) {
        startRowIdx = 0;  //Turn -0 to 0
    }
    var rowIdx = startRowIdx;

    var startColIdx = table.widthToColIndex(-this.tableOX);
    if (startColIdx <= 0) {
        startColIdx = 0;  //Turn -0 to 0
    }
    var colIdx = startColIdx;

    var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;

    var startCellTLX = this.getCellTLX(colIdx),
        cellTLX = startCellTLX;
    var cellTLY = this.getCellTLY(rowIdx);
    while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
        if (this.table.isValidCellIdx(cellIdx)) {
            var cell = table.getCell(cellIdx, true);
            this.visibleCells.set(cell);
            if (!this.preVisibleCells.contains(cell)) {
                this.showCell(cell);
            }
            if (this.scrollMode === 0) {
                cell.setXY(cellTLX, cellTLY);
            } else {
                cell.setXY(cellTLY, cellTLX);
            }
        }

        if ((cellTLX < rightBound) && (colIdx < lastColIdx)) {
            cellTLX += table.getColWidth(colIdx);
            colIdx += 1;
        } else {
            cellTLX = startCellTLX;
            cellTLY += table.getRowHeight(rowIdx);

            colIdx = startColIdx;
            rowIdx += 1;
        }

        cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
    }
}

export default ShowCells;