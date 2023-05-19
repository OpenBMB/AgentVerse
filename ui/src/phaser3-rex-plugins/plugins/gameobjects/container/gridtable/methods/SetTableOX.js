var SetTableOX = function (ox) {
    var table = this.table;
    var leftTableOX = this.leftTableOX;
    var rightTableOX = this.rightTableOX;
    var tableOXExeceedLeft = (ox > this.leftTableOX);
    var tableOXExeceedRight = (ox < this.rightTableOX);
    if (this.clampTableOXY) {
        var colCount = table.colCount;
        var visibleColCount = table.widthToColIndex(this.instWidth, true);

        // less then 1 page            
        if (colCount < visibleColCount) {
            ox = 0;
        } else if (tableOXExeceedLeft) {
            ox = leftTableOX
        } else {
            // var tableVisibleWidth = this.tableVisibleWidth;
            if (tableOXExeceedRight)
                ox = rightTableOX;
        }
    }

    if (this._tableOX !== ox) {
        this._tableOX = ox;
    }

    if (tableOXExeceedLeft) {
        if (!this.execeedLeftState) {
            this.emit('execeedleft', this, ox, leftTableOX);
        }
    }
    this.execeedLeftState = tableOXExeceedLeft;

    if (tableOXExeceedRight) {
        if (!this.execeedRightState) {
            this.emit('execeedright', this, ox, rightTableOX);
        }
    }
    this.execeedRightState = tableOXExeceedRight;
    return this;
}

export default SetTableOX;