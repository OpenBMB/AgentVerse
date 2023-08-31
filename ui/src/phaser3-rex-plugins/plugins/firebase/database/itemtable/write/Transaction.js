var Transaction = function () {
    var key0, key1, key2, callback;

    switch (arguments.length) {
        case 4:
            [key0, key1, key2, callback] = arguments;
            break;
        case 3:
            [key0, key1, callback] = arguments;
            break;
        case 2:
            [key0, callback] = arguments;
            break;
        default:
            callback = arguments[0];
            break;
    }

    // callback: function(preValue) { return newValue; }
    return this.getRef(key0, key1, key2).transaction(callback);
}

export default Transaction;