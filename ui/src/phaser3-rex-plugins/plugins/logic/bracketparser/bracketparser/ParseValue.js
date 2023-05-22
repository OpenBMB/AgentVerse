var ParseValue = function (text, valueConverter) {
    if (text == null) {
        return [];
    }
    var values = text.split(',');
    for (var i = 0, cnt = values.length; i < cnt; i++) {
        values[i] = valueConverter(values[i]);
    }
    return values;
}

export default ParseValue;