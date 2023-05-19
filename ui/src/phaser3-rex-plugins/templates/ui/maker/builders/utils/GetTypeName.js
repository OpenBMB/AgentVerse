var GetTypeName = function (data, styles) {
    if (data.hasOwnProperty('$type')) {
        return data.$type;
    }

    // Get $type from styles[`#${data.name}`]
    if (data.hasOwnProperty('name')) {
        var style = styles[`#${data.name}`];
        if (style && style.hasOwnProperty('$type')) {
            return style.$type;
        }
    }

    if (data.hasOwnProperty('$class')) {
        var clasKeys = data.$class.split(' ');
        for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
            var style = styles[`.${clasKeys[i]}`];
            if (style && style.hasOwnProperty('$type')) {
                return style.$type;
            }
        }
    }

    // return undefined
}

export default GetTypeName;