var ParseValue = function (text, valueConverter) {
    if (text == null) {
        return null;
    }

    var lastTextIndex = text.length - 1;
    var firstChar = text.charAt(0);
    var lastChar = text.charAt(lastTextIndex);

    if (
        ((firstChar === '"') && (lastChar === '"')) ||
        ((firstChar === '"') && (lastChar === '"'))
    ) {
        // Is a quotes string
        return text.substring(1, lastTextIndex);
    } else if (((firstChar === '[') && (lastChar === ']')) ||
        ((firstChar === '{') && (lastChar === '}'))) {
        // Is an array or a dictionary
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    }

    return valueConverter(text);
}

export default ParseValue;