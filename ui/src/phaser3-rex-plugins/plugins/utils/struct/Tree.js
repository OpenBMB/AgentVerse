import SetValue from '../object/SetValue.js';
import Clear from '../object/Clear.js';
import DeepClone from '../object/DeepClone.js';

class Tree {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        this.data = data;
        this.refPath = '';
    }

    getFullPath(keys) {
        if (typeof (keys) === 'string') {
            if (keys === '.') {
                keys = this.refPath;
            } else if (keys.startsWith('..')) {
                if (this.refPath !== '') {
                    var refPathKeys = this.refPath.split('.');
                    refPathKeys.pop()
                    keys = `${refPathKeys.join('.')}${keys.substring(1)}`;
                } else { // this.refPath === ''
                    keys = keys.substring(2);
                }

            } else if (keys.startsWith('.')) {
                if (this.refPath !== '') {
                    keys = `${this.refPath}${keys}`;
                } else { // this.refPath === ''
                    keys = keys.substring(1);
                }
            }
        }

        return keys;
    }

    setRefPath(keys) {
        if (keys === undefined) {
            keys = '';
        }
        this.refPath = this.getFullPath(keys);
        return this;
    }

    setValue(keys, value) {
        if (keys === undefined) {
            this.clear(); // No argument
        } else if (value === undefined) {
            this.data = keys; // JSON keys
        } else {
            SetValue(this.data, this.getFullPath(keys), value);
        }
        return this;
    }

    getValue(keys) {
        if (keys === undefined) {
            return this.data;
        } else {
            if (typeof (keys) === 'string') {
                keys = this.getFullPath(keys).split('.');
            }

            return GetEntry(this.data, keys);
        }
    }

    cloneValue(keys) {
        return DeepClone(this.getValue(keys));
    }

    removeKey(keys) {
        if (keys === undefined) {
            this.clear();
        } else {
            if (typeof (keys) === 'string') {
                keys = this.getFullPath(keys).split('.');
            }

            var lastKey = keys.pop();
            var entry = GetEntry(this.data, keys);

            if (IsObject(entry)) {
                delete entry[lastKey];
            }
        }

        return this;
    }

    hasKey(keys) {
        if (typeof (keys) === 'string') {
            keys = this.getFullPath(keys).split('.');
        }

        var lastKey = keys.pop();
        var entry = GetEntry(this.data, keys);
        if (!IsObject(entry)) {
            return false;
        }

        return entry.hasOwnProperty(lastKey)
    }

    clear() {
        Clear(this.data);
        return this;
    }

    clone(cloneData) {
        var data = (cloneData) ? this.cloneValue() : this.data;
        var tree = new Tree(data);
        tree.setRefPath(this.refPath);
        return tree;
    }
}

var IsObject = function (obj) {
    return (obj != null) && (typeof (obj) === 'object')
}

var GetEntry = function (data, keys) {
    if (keys[0] === '') {
        return data;
    }

    var entry = data;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        if (!IsObject(entry)) {
            return undefined;
        }
        entry = entry[keys[i]];
    }
    return entry;
}


export default Tree;