import GetPropertyPath from './GetPropertyPath.js';

var EmitEvents = function (eventEmitter, op, parentPath, property, value, prevValue) {
    var propertyPath = GetPropertyPath(parentPath, property);
    eventEmitter.emit(`${op}-${propertyPath}`, value, prevValue);

    var parentPath = (parentPath === '') ? '*' : `${parentPath}.*`
    eventEmitter.emit(`${op}-${parentPath}`, property, value, prevValue);

    eventEmitter.emit(`${op}`, propertyPath, value, prevValue);
}

var EmitAddKeyEvents = function (eventEmitter, parentPath, property, value) {
    EmitEvents(eventEmitter, 'add', parentPath, property, value, undefined);
}

var EmitSetValueEvents = function (eventEmitter, parentPath, property, value, prevValue) {
    EmitEvents(eventEmitter, 'set', parentPath, property, value, prevValue);
}

var EmitDeleteKeyEvents = function (eventEmitter, parentPath, property) {
    EmitEvents(eventEmitter, 'del', parentPath, property, undefined, undefined);
}

export {
    EmitAddKeyEvents,
    EmitSetValueEvents,
    EmitDeleteKeyEvents
};