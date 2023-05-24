import Clear from '../../../../utils/object/Clear.js';

var Methods = {
    clear() {
        this.items.length = 0;
        Clear(this.itemID2Index);
        return this;
    },

    getItems() {
        return this.items;
    },

    hasItem(itemID) {
        return this.itemID2Index.hasOwnProperty(itemID);
    },

    getItemIndexFromItemID(itemID) {
        if (itemID == null) {
            return null;
        }
        return this.itemID2Index[itemID];
    },

    getItemFromItemID(itemID) {
        if (itemID == null) {
            return null;
        }
        var index = this.getItemIndexFromItemID(itemID);
        if (index == null) {
            return null;
        }

        return this.items[index];
    },

    forEach(callback, scope) {
        this.items.forEach(callback, scope);
        return this;
    },

    updateItemID2Index() {
        Clear(this.itemID2Index);
        var itemID;
        for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            itemID = this.items[i][this.keyItemID];
            this.itemID2Index[itemID] = i;
        }
        return this;
    }
}
export default Methods;