var HasListener = function (eventEmitter, eventName, fn, context, once) {
    if (once === undefined) {
        once = false;
    }

    var listeners = eventEmitter._events[eventName];
    if (!listeners) {
        return false;
    }

    for (var i = 0, cnt = listeners.length; i < cnt; i++) {
        var listener = listeners[i];
        if ((listener.fn === fn) &&
            (listener.context === context) &&
            (listener.once === once)
        ) {
            return true;
        }
    }

    return false;

}
export default HasListener;