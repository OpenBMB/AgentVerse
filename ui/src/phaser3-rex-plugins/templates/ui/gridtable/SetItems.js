var SetItems = function (items) {
    if (items === undefined) {
        this.items = [];
    } else {
        this.items = items;
    }

    var table = this.childrenMap.child;
    table.setCellsCount(this.items.length);
    table.updateTable(true);

    this.resizeController();
    return this;
}

export default SetItems;