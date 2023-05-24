var GetCellTLY = function (rowIdx) {
    var oy = (this.scrollMode === 0) ? this.topLeftY : this.topLeftX;
    var y = this.tableOY + this.table.rowIndexToHeight(0, rowIdx - 1) + oy;
    return y;
}

export default GetCellTLY;