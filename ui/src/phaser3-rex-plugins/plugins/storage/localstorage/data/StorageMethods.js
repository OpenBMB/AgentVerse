import {
    GetStoreKey, GetDataKey,
    SetItem, GetItem, RemoveItem
} from '../utils/StorageMethods.js';

export default {
    getStoreKey(dataKey) {
        return GetStoreKey(dataKey, this.name);
    },

    getDataKey(storeKey) {
        return GetDataKey(storeKey, this.name);
    },

    setItem(dataKey, value) {
        SetItem(dataKey, this.name, value);
        return this;
    },

    getItem(dataKey) {
        return GetItem(dataKey, this.name);
    },

    removeItem(dataKey) {
        RemoveItem(dataKey, this.name);
        return this;
    }
}