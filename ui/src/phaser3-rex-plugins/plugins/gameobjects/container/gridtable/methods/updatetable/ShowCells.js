import AlignIn from '../../../../../utils/actions/AlignIn.js';

var ShowCells = function () {
    if (this.cellsCount === 0) {
        return;
    }
    var table = this.table;

    this.startRowIndex = Math.max(table.heightToRowIndex(-this.tableOY, 2), 0);
    var rowIndex = this.startRowIndex;

    var startColumnIndex = Math.max(table.widthToColIndex(-this.tableOX), 0);
    var columnIndex = startColumnIndex;

    var cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    var bottomBound = this.bottomBound;
    var rightBound = this.rightBound;
    var lastIdx = table.cellsCount - 1;
    var lastColIdx = table.colCount - 1;

    var startCellTLX = this.getCellTLX(columnIndex),
        cellTLX = startCellTLX;
    var cellTLY = this.getCellTLY(rowIndex);
    while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
        if (this.table.isValidCellIdx(cellIdx)) {
            var cell = table.getCell(cellIdx, true);
            this.visibleCells.set(cell);
            if (!this.preVisibleCells.contains(cell)) {
                this.showCell(cell);
            }

            var x, y;
            if (this.scrollMode === 0) {
                x = cellTLX;
                y = cellTLY;
            } else {
                x = cellTLY;
                y = cellTLX;
            }
            if (cell.cellContainerAlign == null) {
                cell.setXY(x, y);
            } else {
                var cellContainer = cell.getContainer();
                AlignIn(cellContainer, x, y, cell.width, cell.height, cell.cellContainerAlign);
                cell.setXY(cellContainer.x, cellContainer.y);
            }
        }

        if ((cellTLX < rightBound) && (columnIndex < lastColIdx)) {
            cellTLX += table.getColWidth(columnIndex);
            columnIndex += 1;
        } else {
            cellTLX = startCellTLX;
            cellTLY += table.getRowHeight(rowIndex);

            columnIndex = startColumnIndex;
            rowIndex += 1;
        }

        cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
    }
}

export default ShowCells;