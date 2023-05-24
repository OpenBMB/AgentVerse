import SpliceOne from '../../utils/array/SpliceOne.js';
import RandomBetween from '../../utils/math/Between.js';
import Shuffle from '../../utils/array/Shuffle.js';
import Clone from '../../utils/object/Clone.js';

export default {
    isEmpty() {
        return (this.items.length === 0);
    },

    get(index) {
        return this.items[index];
    },

    getFirst() {
        return this.items[0];
    },

    getLast() {
        return this.items[this.items.length - 1];
    },

    getRandom() {
        var index = RandomBetween(0, this.items.length - 1);
        return this.items[index];
    },

    add(item, index, moveToNewPosition) {
        var currentIndex = this.items.indexOf(item);
        if (currentIndex !== -1) {
            if (moveToNewPosition && (index !== currentIndex)) {
                this.remove(undefined, currentIndex);
                this.add(item, index);
            }
            return this;
        }

        if ((index === undefined) || (index >= this.items.length)) {
            this.items.push(item);
        } else {
            this.items.splice(index, 0, item);
        }

        this.addDestroyCallback(item);

        return this;
    },

    addFirst(item, moveToNewPosition) {
        this.add(item, 0, moveToNewPosition);
        return this;
    },

    addLast(item, moveToNewPosition) {
        this.add(item, undefined, moveToNewPosition);
        return this;
    },

    addMultiple(items, index, moveToNewPosition) {
        if (index === undefined) {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                this.add(items[i]);
            }
        } else {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                if (this.contains(items[i])) {
                    continue;
                }
                this.add(items[i], index, moveToNewPosition);
                index++;
            }
        }
        return this;
    },

    remove(item, index) {
        if (item) {
            index = this.items.indexOf(item);
            if (index === -1) {
                return this;
            }
        } else {
            item = this.items[index];
            if (!item) {
                return this;
            }
        }


        if (index === (this.items.length - 1)) {
            this.items.length -= 1;
        } else {
            SpliceOne(this.items, index);
        }

        this.removeDestroyCallback(item);

        return this;
    },

    onChildDestroy(child, fromScene) {
        this.remove(child);
    },

    removeFirst() {
        this.remove(undefined, 0);
        return this;
    },

    removeLast() {
        this.remove(undefined, (this.item.length - 1));
        return this;
    },

    removeMultiple(items) {
        for (var i = items.length; i > 0; i--) {
            this.remove(items[i - 1]);
        }
        return this;
    },

    clear(destroyItems) {
        var items;
        if (destroyItems) {
            items = this.cloneItems();
        }

        this.removeDestroyCallback(this.items);
        this.items.length = 0;

        if (destroyItems) {
            for (var i = items.length; i > 0; i--) {
                items[i].destroy();
            }
        }
        return this;
    },

    clone(out) {
        if (out === this) {
            return this;
        } else if (out === undefined) {
            out = this.newList();
        }

        out.clear();
        Clone(this.items, out.items);
        out.addDestroyCallback(out.items)
        return out;
    },

    pop(index) {
        if (index === undefined) {
            index = 0;
        }

        var item = this.items[index];
        this.remove(undefined, index);
        return item;
    },

    popFirst() {
        return this.pop(0);
    },

    popLast() {
        return this.pop(this.items.length - 1);
    },

    popRandom() {
        var index = RandomBetween(0, this.items.length - 1);
        return this.pop(index);
    },

    slice(start, end, out) {
        var result = this.items.slice(start, (end + 1));

        if (out === undefined) {
            out = this.newList();
        }
        out.clear();
        Clone(result, out.items);
        out.addDestroyCallback(out.items);
        return out;
    },

    reverse() {
        this.items.reverse();
        return this;
    },

    sort(callback) {
        this.items.sort(callback);
        return this;
    },

    shuffle() {
        Shuffle(this.items);
        return this;
    }
};