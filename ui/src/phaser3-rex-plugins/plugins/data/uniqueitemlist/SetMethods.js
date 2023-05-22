import Clone from "../../utils/object/Clone";

export default {
    union(listB, out) {    
        if (this === listB) {
            if (this !== out) {
                out = this.clone(out);
            }
        } else if (this === out) {
            this.addMultiple(listB.items);
        } else if (listB === out) {
            listB.addMultiple(this.items);
        } else {
            if (this.items.length >= listB.items.length) {
                out = this.clone(out);
                out.addMultiple(listB.items);
            } else {
                out = listB.clone(out);
                out.addMultiple(this.items);
            }
        }
        return out;
    },

    intersect(listB, out) {
        if (this === listB) {
            if (this !== out) {
                out = this.clone(out);
            }
        } else if (this === out) {
            var itemsA = Clone(this.items);
            this.clear();

            var item;
            for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                item = itemsA[i];
                if (listB.contains(item)) {
                    this.add(item);
                }
            }
        } else if (listB === out) {
            var itemsB = Clone(listB.items);
            listB.clear();

            var item;
            for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                item = itemsB[i];
                if (this.contains(item)) {
                    listB.add(item);
                }
            }
        } else {
            out = this.newList();
            if (this.items.length >= listB.items.length) {
                var itemsB = listB.items, item;
                for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
                    item = itemsB[i];
                    if (this.contains(item)) {
                        out.add(item);
                    }
                }
            } else {
                var itemsA = this.items, item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsA[i];
                    if (listB.contains(item)) {
                        out.add(item);
                    }
                }
            }
        }
        return out;
    },

    difference(listB, out) {
        if (this === listB) {
            if (this === out) {
                this.clear();
            } else {
                out = this.newList();
            }
        } else if (this === out) {
            var itemsA = Clone(this.items);
            this.clear();

            var item;
            for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                item = itemsA[i];
                if (!listB.contains(item)) {
                    this.add(item);
                }
            }
        } else if (listB === out) {
            var itemsB = Clone(listB.items);
            listB.clear();

            var item;
            for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                item = itemsB[i];
                if (!this.contains(item)) {
                    listB.add(item);
                }
            }
        } else {
            out = this.newList();
            if (this.items.length >= listB.items.length) {
                var itemsB = listB.items, item;
                for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
                    item = itemsB[i];
                    if (!this.contains(item)) {
                        out.add(item);
                    }
                }
            } else {
                var itemsA = this.items, item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsA[i];
                    if (!listB.contains(item)) {
                        out.add(item);
                    }
                }
            }
        }
        return out;
    },
};