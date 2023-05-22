var WaitEvent = function (eventEmitter, eventName) {
    return new Promise(function (resolve, reject) {
        eventEmitter.once(eventName, function () {
            resolve();
        });
    });
}

var WaitComplete = function (eventEmitter) {
    return WaitEvent(eventEmitter, 'complete');
}

export { WaitEvent, WaitComplete };