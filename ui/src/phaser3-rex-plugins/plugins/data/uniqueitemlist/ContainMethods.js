export default {
    contains(item) {
        return (this.items.indexOf(item) !== -1);
    },

    any(listB) {
        var items = (this.isList(listB)) ? listB.items : listB;
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (this.contains(items[i])) {
                return true;
            }
        }
        return false;
    },

    all(listB) {
        var items = (this.isList(listB)) ? listB.items : listB;
        for (var i = 0, cnt = items; i < cnt; i++) {
            if (!this.contains(items[i])) {
                return false;
            }
        }
        return true;
    }
}