import ArrayFill from '../../../plugins/utils/array/Fill.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ResetGrid = function (columnCount, rowCount, columnProportions, rowProportions, space) {
    if (columnProportions === undefined) {
        columnProportions = 0;
    }
    if (rowProportions === undefined) {
        rowProportions = 0;
    }

    this.columnCount = columnCount;
    this.rowCount = rowCount;
    this.gridCount = columnCount * rowCount;

    // children
    if (this.sizerChildren === undefined) {
        this.sizerChildren = [];
    } else {
        this.removeAll();
    }
    this.sizerChildren.length = columnCount * rowCount;
    ArrayFill(this.sizerChildren, null);

    // proportions
    this.columnProportions = [];
    this.columnProportions.length = columnCount;
    if (typeof (columnProportions) === 'number') {
        ArrayFill(this.columnProportions, columnProportions);
    } else {
        for (var i = 0; i < columnCount; i++) {
            this.columnProportions[i] = columnProportions[i] || 0;
        }
    }
    this.rowProportions = [];
    this.rowProportions.length = rowCount;
    if (typeof (rowProportions) === 'number') {
        ArrayFill(this.rowProportions, rowProportions);
    } else {
        for (var i = 0; i < rowCount; i++) {
            this.rowProportions[i] = rowProportions[i] || 0;
        }
    }

    // width & height
    this.columnWidth = [];
    this.columnWidth.length = columnCount;
    this.rowHeight = [];
    this.rowHeight.length = rowCount;

    // space
    this.space.column = [];
    this.space.column.length = columnCount - 1;
    var columnSpace = GetValue(space, 'column', 0);
    if (typeof (columnSpace) === 'number') {
        ArrayFill(this.space.column, columnSpace);
    } else {
        for (var i = 0, cnt = this.space.column.length; i < cnt; i++) {
            this.space.column[i] = columnSpace[i] || 0;
        }
    }
    this.space.row = [];
    this.space.row.length = rowCount - 1;
    var rowSpace = GetValue(space, 'row', 0);
    if (typeof (rowSpace) === 'number') {
        ArrayFill(this.space.row, rowSpace);
    } else {
        for (var i = 0, cnt = this.space.row.length; i < cnt; i++) {
            this.space.row[i] = rowSpace[i] || 0;
        }
    }

    return this;
}

export default ResetGrid;