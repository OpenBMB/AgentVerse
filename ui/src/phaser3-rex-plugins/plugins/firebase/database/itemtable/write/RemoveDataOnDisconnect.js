var RemoveDataOnDisconnect = function () {
    var key0, key1, key2;

    switch (arguments.length) {
        case 3:
            [key0, key1, key2] = arguments;
            break;
        case 2:
            [key0, key1] = arguments;
            break;
        case 1:
            key0 = arguments[0];
            break;
    }

    return this.getRef(key0, key1, key2).onDisconnect().remove();
}

export default RemoveDataOnDisconnect;