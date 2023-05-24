import IsPlainObject from '../../utils/object/IsPlainObject.js';
import GetValue from '../../utils/object/GetValue.js';
import DestroyCallbackMethods from './DestroyCallbackMethods.js';
import ContainMethods from './ContainMethods.js';
import ArrayMethods from './ArrayMethods.js';
import SetMethods from './SetMethods.js';
import Clone from '../../utils/object/Clone.js';
import ArrayCopy from '../../utils/array/Copy.js';

class UniqueItemList {
    constructor(items, config) {
        if (IsPlainObject(items)) {
            config = items;
            items = GetValue(config, 'items', undefined);
        }

        this.items = [];
        this.setAutoCleanupEnable(GetValue(config, 'autoCleanup', true));
        if (items) {
            this.addMultiple(items);
        }
    }

    destroy(destroyItems) {
        this.clear(destroyItems);
        this.items = undefined;
    }

    getItems() {
        return this.items;
    }

    cloneItems(out) {
        return Clone(this.items, out);
    }

    isList(item) {
        return (item instanceof UniqueItemList);
    }

    newList(items) {
        var config = {
            autoCleanup: this.autoCleanupEnable
        }
        return new UniqueItemList(items, config);
    }

    get length() {
        return this.items.length;
    }

    call(callback, scope) {
        if (this.items.length === 0) {
            return this;
        }

        if (typeof (callback) === 'string') {
            var fnName = callback;
            ArrayCopy(ARGS, arguments, 1);
            var item;
            for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                item = this.items[i];
                item[fnName].apply(item, ARGS);
            }
            ARGS.length = 0;

        } else {
            for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                if (scope) {
                    callback.call(scope, this.items[i], i);
                } else {
                    callback(this.items[i], i);
                }
            }
        }
        return this;
    }
}

var ARGS = []; // reuse this array

Object.assign(
    UniqueItemList.prototype,
    DestroyCallbackMethods,
    ContainMethods,
    ArrayMethods,
    SetMethods
)

export default UniqueItemList;