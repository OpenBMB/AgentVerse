var DataToItem = function (data, itemClass, item) {
    if (!item) {
        item = new itemClass();
    }
    item.set(data);
    return item;
}

export default DataToItem;