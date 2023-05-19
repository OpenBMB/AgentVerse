export default {
    scrollToRow(rowIndex) {
        var table = this.childrenMap.child;
        table.scrollToRow(rowIndex);
        return this;
    },

    scrollToNextRow(rowCount) {
        var table = this.childrenMap.child;
        table.scrollToNextRow(rowCount);
        return this;
    }
}