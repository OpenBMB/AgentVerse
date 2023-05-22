var GetPlayinigMotionNames = function () {
    var names = [];
    var motionManager = this._motionManager;
    var motions = motionManager._motions;
    for (var i = 0, cnt = motions.getSize(); i < cnt; i++) {
        var motionQueueEntry = motions.at(i);
        if (motionQueueEntry._finished) {
            continue;
        }
        names.push(motionQueueEntry._motion._name);
    }

    return names;
}

export default GetPlayinigMotionNames;