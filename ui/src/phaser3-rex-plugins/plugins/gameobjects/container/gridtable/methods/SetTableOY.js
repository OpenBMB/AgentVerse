var SetTableOY = function (oy) {
    var table = this.table;
    var topTableOY = this.topTableOY;
    var bottomTableOY = this.bottomTableOY;
    var tableOYExceedTop = (oy > this.topTableOY);
    var tableOYExeceedBottom = (oy < this.bottomTableOY);
    if (this.clampTableOXY) {
        var rowCount = table.rowCount;
        var visibleRowCount = table.heightToRowIndex(this.instHeight, 1);

        // less then 1 page
        if (rowCount < visibleRowCount) {
            oy = 0;
        } else if (tableOYExceedTop) {
            oy = topTableOY
        } else if (tableOYExeceedBottom) {
            oy = bottomTableOY;
        }
    }

    if (this._tableOY !== oy) {
        this._tableOY = oy;
    }


    if (tableOYExceedTop) {
        if (!this.execeedTopState) {
            this.emit('execeedtop', this, oy, topTableOY);
        }
    }
    this.execeedTopState = tableOYExceedTop;

    if (tableOYExeceedBottom) {
        if (!this.execeedBottomState) {
            this.emit('execeedbottom', this, oy, bottomTableOY);
        }
    }
    this.execeedBottomState = tableOYExeceedBottom;
    return this;
}

export default SetTableOY;