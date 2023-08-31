var GetPartialData = function (obj, keys, out) {
    if (out === undefined) {
        out = {};
    }

    if (Array.isArray(keys)) {
        var key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            key = keys[i];
            out[key] = obj[key];
        }
    } else {
        for (var key in keys) {
            out[key] = obj[key];
        }
    }

    return out;
}

export default GetPartialData;