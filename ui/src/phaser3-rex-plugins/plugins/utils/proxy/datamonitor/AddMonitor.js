import { EmitAddKeyEvents, EmitSetValueEvents, EmitDeleteKeyEvents } from './EmitEvents.js';
import GetPropertyPath from './GetPropertyPath.js';

var AddMonitor = function (eventEmitter, data, parentPath) {
    var monitor;
    if (Array.isArray(data)) {
        monitor = AddArrayMonitor(eventEmitter, data, parentPath);
    } else {
        monitor = AddDictionaryMonitor(eventEmitter, data, parentPath);
    }

    for (var property in data) {
        var child = data[property];
        if ((child !== null) && (typeof (child) === 'object')) {
            var propertyPath = GetPropertyPath(parentPath, property);
            monitor[property] = AddMonitor(eventEmitter, child, propertyPath);
        } else {
            EmitAddKeyEvents(eventEmitter, parentPath, property, child, undefined);
        }
    }

    return monitor;
}

var AddDictionaryMonitor = function (eventEmitter, data, parentPath) {
    return new Proxy(data, {
        set(target, property, value) {
            if (Reflect.has(target, property)) {
                var prevValue = Reflect.get(target, property);
                Reflect.set(target, property, value);
                EmitSetValueEvents(eventEmitter, parentPath, property, value, prevValue);
            } else {
                Reflect.set(target, property, value);
                EmitAddKeyEvents(eventEmitter, parentPath, property, value);
            }
            return true;
        },

        deleteProperty(target, property) {
            if (Reflect.has(target, property)) {
                Reflect.deleteProperty(target, property);
                EmitDeleteKeyEvents(eventEmitter, parentPath, property);
            }
            return true;
        }
    });
}

var AddArrayMonitor = function (eventEmitter, data, parentPath) {
    return new Proxy(data, {
        set(target, property, value) {
            if (property === 'length') { // Skip length property
                return true;
            }

            var prevValue = Reflect.get(target, property);
            Reflect.set(target, property, value);
            EmitSetValueEvents(eventEmitter, parentPath, property, value, prevValue);
            return true;
        },

        deleteProperty(target, property) {
            Reflect.deleteProperty(target, property);
            target.splice(property, 1);
            EmitDeleteKeyEvents(eventEmitter, parentPath, property);
            return true;
        }
    });
}

export default AddMonitor;