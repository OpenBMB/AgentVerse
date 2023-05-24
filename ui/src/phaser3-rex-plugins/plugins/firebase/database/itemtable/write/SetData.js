var SetData = function () {
    var key0, key1, key2, value;

    switch (arguments.length) {
        case 4:
            [key0, key1, key2, value] = arguments;
            break;
        case 3:
            [key0, key1, value] = arguments;
            break;
        case 2:
            [key0, value] = arguments;
            break;
        default:
            value = arguments[0];
            break;
    }

    return this.getRef(key0, key1, key2).set(value);
}

export default SetData;