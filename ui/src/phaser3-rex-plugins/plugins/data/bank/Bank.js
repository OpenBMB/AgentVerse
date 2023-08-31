import GetValue from '../../utils/object/GetValue.js';

class Bank {
    constructor(config) {
        this.nextId = GetValue(config, 'start', 1); // start index
        this.uidKey = GetValue(config, 'uidKey', '$uid');
        this.autoRemove = GetValue(config, 'remove', true);
        this.refs = {};
        this.count = 0;
    }

    add(gameObject, uid) {
        var refs = this.refs;
        var uidKey = this.uidKey;
        if (uidKey) {
            var uid = gameObject[uidKey];
            if (uid != null) {
                return this;
            }
        }

        if (uid == null) {
            do {
                uid = this.nextId;
                this.nextId++;
            } while (refs.hasOwnProperty(uid))
        }

        if (!refs.hasOwnProperty(uid)) {
            refs[uid] = gameObject;
            this.count++;
            if (uidKey) {
                gameObject[uidKey] = uid;
            }
            if (this.autoRemove && gameObject.on) {
                gameObject.once('destroy', function () {
                    this.remove(uid);
                }, this)
            }
        } else {
            uid = null;
        }

        if (uidKey) {
            return this;
        } else {
            return uid;
        }
    }

    addMultiple(objects) {
        for (var i = 0, cnt = objects.length; i < cnt; i++) {
            this.add(objects[i]);
        }
        return this;
    }

    get(uid) {
        return this.refs[uid];
    }

    has(uid) {
        return this.refs.hasOwnProperty(uid);
    }

    remove(uid) {
        var refs = this.refs;
        if (refs.hasOwnProperty(uid)) {
            if (this.uidKey) {
                var gameObject = refs[uid];
                gameObject[this.uidKey] = undefined;
            }
            delete refs[uid];
            this.count--;
        }
        return this;
    }

    forEach(callback, scope) {
        var refs = this.refs,
            gameObject;
        for (var uid in refs) {
            gameObject = refs[uid];
            if (scope) {
                callback.call(scope, gameObject, uid);
            } else {
                callback(gameObject, uid);
            }
        }
    }

    clear() {
        this.forEach(function (gameObject) {
            this.remove(gameObject);
        }, this);
    }
}

export default Bank;