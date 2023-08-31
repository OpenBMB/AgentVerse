import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import KeyHub from './KeyHub.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

class KeysHub {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        config.eventEmitter = this.getEventEmitter();

        this.scene = scene;
        this.keys = {};
    }

    destroy() {
        this.destroyEventEmitter();

        for (var keyCode in this.keys) {
            this.keys[keyCode].destroy();
        }
        this.keys = undefined;
    }

    plugKey(key, keyCode) {
        if (keyCode === undefined) {
            keyCode = key.keyCode;
        }

        this.addKey(keyCode).plug(key);
        return this;
    }

    plugKeys(keys) {
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.plugKey(keys[i]);
            }
        } else {
            for (var keyCode in keys) {
                this.plugKey(keys[keyCode], keyCode);
            }
        }
        return this;
    }

    unplug(key) {
        for (var keyCode in this.keys) {
            this.keys[keyCode].unplug(key);
        }
        return this;
    }

    unplug(keys) {
        if (Array.isArray(keys)) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.unplugKey(keys[i]);
            }
        } else {
            for (var keyCode in keys) {
                this.unplugKey(keys[keyCode]);
            }
        }
        return this;
    }

    addKey(keyCode) {
        if (typeof (keyCode) === 'string') {
            keyCode = KeyCodes[keyCode.toUpperCase()];
        }
        if (!this.keys.hasOwnProperty(keyCode)) {
            this.keys[keyCode] = new KeyHub(this, keyCode);
        }
        return this.keys[keyCode];
    }

    addKeys(keys) {
        var output = {};
        if (typeof (keys) === 'string') {
            keys = keys.split(',');

            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                var currentKey = keys[i].trim();

                if (currentKey) {
                    output[currentKey] = this.addKey(currentKey);
                }
            }
        } else {
            for (var key in keys) {
                output[key] = this.addKey(keys[key]);
            }
        }

        return output;
    }

    createCursorKeys() {
        return this.addKeys({
            up: KeyCodes.UP,
            down: KeyCodes.DOWN,
            left: KeyCodes.LEFT,
            right: KeyCodes.RIGHT,
            space: KeyCodes.SPACE,
            shift: KeyCodes.SHIFT
        });
    }
}

Object.assign(
    KeysHub.prototype,
    EventEmitterMethods
);

export default KeysHub;