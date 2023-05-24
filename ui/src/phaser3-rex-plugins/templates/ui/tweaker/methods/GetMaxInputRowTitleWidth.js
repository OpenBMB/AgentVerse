var GetMaxInputRowTitleWidth = function () {
    var maxTitleWidth = 0;
    var children = this.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }

        if (child.getMinTitleWidth) {  // InputRow
            maxTitleWidth = Math.max(maxTitleWidth, child.getMinTitleWidth());
        } else if (child.getMaxInputRowTitleWidth) {  // Folder, TabPages
            maxTitleWidth = Math.max(maxTitleWidth, child.getMaxInputRowTitleWidth());
        }
    }

    return maxTitleWidth + this.getInnerPadding('left');
}

export default GetMaxInputRowTitleWidth;