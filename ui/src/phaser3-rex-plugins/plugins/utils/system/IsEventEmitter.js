var IsEventEmitter = function (obj) {
    if (obj && typeof obj === 'object') {
        return !!obj.on;
    }
    return false;
}

export default IsEventEmitter;