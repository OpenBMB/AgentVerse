import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods.js';

class BaseUpdater {
    constructor(config) {
        // Event emitter
        this.setEventEmitter(config.eventEmitter, config.EventEmitterClass);

        this.parent = config.parent;
        this.key = config.key;
        if (this.parent) {
            this.fullKeyPath = ExtendKeyPath(this.parent.fullKeyPath, this.key);
        } else {
            this.fullKeyPath = '';
        }
        this.type = config.type;
        this.eventNameMap = config.eventNames;
        this.table = config.table;

        this.database = firebase.database();
        this.setRootPath();
        this.children = {};
    }

    shutdown() {
        this
            .stopUpdate()
            .clear()
            .destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        if (rootPath === undefined) {
            var parentRootPath = (this.parent) ? this.parent.rootPath : '';
            rootPath = `${parentRootPath}/${this.key}`;
        }
        this.rootPath = rootPath;

        var child;
        for (var key in this.children) {
            child = this.children[key];
            if (child instanceof BaseUpdater) {
                child.setRootPath();
            }
        }
        return this;
    }

    get rootRef() {
        return this.database.ref(this.rootPath);
    }

    load() {
        var self = this;
        return this.rootRef.once('value')
            .then(function (snapshot) {
                // Won't add any child
                var value = snapshot.val() || {};
                self.table.setValue(value)
                return Promise.resolve(value)
            })
    }

    setData(key, value) {
        if (key === undefined) {
            this.clear(); // Clear
        } else if (value === undefined) {
            var data = key; // JSON data
            for (key in this.children) { // Not in new data
                if (!data.hasOwnProperty(key)) {
                    this.removeChild(key);
                }
            }
            for (key in data) {
                this.setChildData(key, data[key]);
            }
        } else {
            this.setChildData(key, value); // Pass data to column-updater
        }
        return this;
    }

    clear() {
        this.table.removeKey(this.fullKeyPath);
        for (var key in this.children) {
            this.removeChild(key);
        }
        return this;
    }

    // Overwrite
    get childClass() {
        return undefined;
    }

    // Overwrite
    setChildData(key, data) {
        var keyPath = ExtendKeyPath(this.fullKeyPath, key);
        this.table.setValue(keyPath, data);

        if (!this.children.hasOwnProperty(key)) {
            if (this.childClass) {
                var child = new this.childClass({
                    parent: this,
                    key: key,
                    type: this.type,
                    eventEmitter: this.getEventEmitter(),
                    eventNames: this.eventNameMap,
                    table: this.table
                });
                child.startUpdate();
                this.children[key] = child;
            }
        } else {
            this.children[key].setData(data);
        }
        return this;
    }

    // Overwrite
    removeChild(key) {
        if (this.children.hasOwnProperty(key)) {
            this.children[key].destroy();
            delete this.children[key];
        }
        return this;
    }

    // Overwrite
    startUpdate() { }

    // Overwrite
    stopUpdate() { }
}

var ExtendKeyPath = function (baseKeyPath, newKey) {
    if ((baseKeyPath == null) || (baseKeyPath === '')) {
        return newKey;
    } else if ((newKey == null) || (newKey === '')) {
        return baseKeyPath;
    } else {
        return `${baseKeyPath}.${newKey}`;
    }
}

Object.assign(
    BaseUpdater.prototype,
    EventEmitterMethods
);

export default BaseUpdater;