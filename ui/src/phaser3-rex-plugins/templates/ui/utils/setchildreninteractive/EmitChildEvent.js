import PointToChild from './PointToChild.js';

var EmitChildEvent = function (eventEmitter, eventName, parents, x, y, pointer, event) {
    var child;
    if (y === undefined) {
        child = x;
    } else {
        child = PointToChild(parents, x, y);
    }

    if (!child) {
        return;
    }

    eventEmitter.emit(eventName, child, pointer, event);
}

export default EmitChildEvent;