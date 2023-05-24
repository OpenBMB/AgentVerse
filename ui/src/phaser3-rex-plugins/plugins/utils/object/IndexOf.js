var IndexOf = function (obj, child) {
    if (Array.isArray(obj)) {
        return obj.indexOf(child);
    } else {
        for (var key in obj) {
            if (obj[key] === child) {
                return key;
            }
        }
        return null;
    }
}

export default IndexOf;