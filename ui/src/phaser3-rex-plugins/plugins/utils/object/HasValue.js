var HasValue = function (source, key) {
    if (!source || typeof source === 'number') {
        return false;
    }
    else if (source.hasOwnProperty(key)) {
        return true;
    }
    else if (key.indexOf('.') !== -1) {
        var keys = key.split('.');
        var parent = source;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            if (parent.hasOwnProperty(keys[i])) {
                parent = parent[keys[i]];
            }
            else {
                //  Can't go any further
                return false;
            }
        }

        return true;
    }
    else {
        return false;
    }
};

export default HasValue;
