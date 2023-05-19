var GetProperty = function (context, key, defaultValue, dotMode) {
    if (dotMode === undefined) {
        dotMode = true;
    }

    if (!context || typeof (context) === 'number' || typeof (context) === 'string') {
        return defaultValue;
    } else if (key in context) {
        return context[key];
    } else if (dotMode &&
        ((Array.isArray(key) || (key.indexOf('.') !== -1)))
    ) {
        var keys = (Array.isArray(key)) ? key : key.split('.');
        var value = context;
        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in value) {
                value = value[key];
            }
            else {
                value = defaultValue;
                break;
            }
        }

        return value;
    } else {
        return defaultValue;
    }
}

export default GetProperty;