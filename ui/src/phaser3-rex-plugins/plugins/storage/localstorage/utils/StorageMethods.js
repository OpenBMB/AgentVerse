var GetStoreKey = function (key, prefix) {
    if (prefix && prefix !== '') {
        return `${prefix}.${key}`;
    } else {
        return key;
    }
};

var GetDataKey = function (key, prefix) {
    if (prefix && prefix !== '') {
        return key.substring(prefix.length + 1)
    } else {
        return key;
    }
}

var SetItem = function (dataKey, prefix, value) {
    // Ref : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
    // **The keys and the values are always strings**
    value = JSON.stringify([value]);
    localStorage.setItem(GetStoreKey(dataKey, prefix), value);
}

var GetItem = function (dataKey, prefix) {
    var value = localStorage.getItem(GetStoreKey(dataKey, prefix));

    if (value == null) {
        return undefined;
    } else {
        value = JSON.parse(value)[0];
        return value
    }
}

var RemoveItem = function (dataKey, prefix) {
    localStorage.removeItem(GetStoreKey(dataKey, prefix));
    return this;
}

export {
    GetStoreKey, GetDataKey,
    SetItem, GetItem, RemoveItem
}