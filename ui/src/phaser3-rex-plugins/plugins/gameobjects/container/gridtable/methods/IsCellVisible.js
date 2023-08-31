var IsCellVisible = function (cellIdx) {
    var cell = this.table.getCell(cellIdx, false);
    return cell && this.visibleCells.contains(cell);
}

export default IsCellVisible;