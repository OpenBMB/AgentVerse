var RemoveData = function () {
    var key0, key1, key2;

    switch (arguments.length) {
        case 3:
            [key0, key1, key2] = arguments;
            break;
        case 2:
            [key0, key1] = arguments;
            break;
        default:
            key0 = arguments[0];
            break;
    }

    return this.getRef(key0, key1, key2).remove();
}

export default RemoveData;