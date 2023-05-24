var CopyProperty = function (from, to, key) {
    if (typeof (key) === 'string') {
        if (from.hasOwnProperty(key)) {
            to[key] = from[key];
        }
    } else {
        var keys = key;
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                CopyProperty(from, to, keys[i]);
            }
        } else {
            for (var key in keys) {
                CopyProperty(from, to, key);
            }
        }
    }
}


export default CopyProperty;