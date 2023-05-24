var Clear = function (obj) {
    if ((typeof (obj) !== 'object') || (obj === null)) {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.length = 0;
    } else {
        for (var key in obj) {
            delete obj[key];
        }
    }

    return obj;
}

export default Clear;