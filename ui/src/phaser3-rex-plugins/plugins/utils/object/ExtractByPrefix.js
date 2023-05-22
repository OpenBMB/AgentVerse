var ExtractByPrefix = function (obj, prefix, delimiter, out) {
    if (delimiter === undefined) {
        delimiter = '.';
    }

    if (out === undefined) {
        out = {};
    }

    if (!obj) {
        return out;
    }

    if (prefix in obj) {
        return Object.assign(out, obj[prefix])
    }

    prefix += delimiter;

    for (var key in obj) {
        if (!key.startsWith(prefix)) {
            continue;
        }

        out[key.replace(prefix, '')] = obj[key];
    }

    return out;
}

export default ExtractByPrefix;