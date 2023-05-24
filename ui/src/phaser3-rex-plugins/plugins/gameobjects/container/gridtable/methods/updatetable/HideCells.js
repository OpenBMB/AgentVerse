var HideCells = function () {
    var preList = this.preVisibleCells;
    var curList = this.visibleCells;
    preList.iterate(function (cell) {
        if (!curList.contains(cell)) {
            this.hideCell(cell);
        }
    }, this);
}

export default HideCells;