var InseryEmptyRow = function (rowIndex, proportion, space) {
    if (proportion === undefined) {
        proportion = this.rowProportions[0] || 0;
    }
    if (space === undefined) {
        space = this.space.row[0] || 0;
    }

    this.rowCount += 1;
    this.gridCount += this.columnCount;

    var args = [rowIndex * this.columnCount, 0];
    for (var i = 0; i < this.columnCount; i++) {
        args.push(null);
    }
    this.sizerChildren.splice.apply(this.sizerChildren, args);

    this.rowProportions.push(proportion);

    this.rowHeight.length += 1;  // this.rowHeight will be recalculated when layout()    

    this.space.row.splice(rowIndex, 0, space);

    return this;
}

var AddEmptyRow = function (proportion, space) {
    InseryEmptyRow.call(this, this.rowCount, proportion, space);
    return this;
}

export {
    InseryEmptyRow,
    AddEmptyRow
};