import localforage from 'localforage';

var SetItems = function (data, store) {
    if (store === undefined) {
        store = localforage;
    }

    var promises = [];
    for (var key in data) {
        promises.push(
            store.setItem(key, data[key])
        );
    }
    return Promise.all(promises);
}

export default SetItems;