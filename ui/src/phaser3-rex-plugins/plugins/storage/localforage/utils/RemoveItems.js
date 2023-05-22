import localforage from 'localforage';

var RemoveItems = function(data, store) {
    if (store === undefined) {
        store = localforage;
    }

    var keys;
    if (Array.isArray(data)) {
        keys =data;
    } else {
        keys = [];
        for(var key in data){
            keys.push(key);
        }
    }

    var promises =[];
    for(var i=0,cnt=keys.length; i<cnt;i++) {
        promises.push(
            store.removeItem(keys[i])
        )
    }
    return Promise.all(promises);
}

export default RemoveItems;