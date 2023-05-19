var GetCellTLX = function (colIdx) {
    var ox = (this.scrollMode === 0) ? this.topLeftX : this.topLeftY;
    var x = this.tableOX + this.table.colIndexToWidth(0, colIdx - 1) + ox;
    return x;
}

export default GetCellTLX;