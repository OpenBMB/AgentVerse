import KeyMap from '../../utils/input/KeyMap.js';

const Key = Phaser.Input.Keyboard.Key;
const AddItem = Phaser.Utils.Array.Add;
const RemoveItem = Phaser.Utils.Array.Remove;

class KeyHub extends Key {
    constructor(parent, keyCode) {
        super(parent, keyCode);

        this.ports = [];
    }

    destroy() {
        for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
            this.ports[i]
                .off('down', this.update, this)
                .off('up', this.update, this)
        }
        this.ports = undefined;
        super.destroy();
    }

    plug(key) {
        AddItem(this.ports, key, 0, function (key) {
            key
                .on('down', this.update, this)
                .on('up', this.update, this)

            this.update(FakeEvent);
        }, this);
        return this;
    }

    unplug(key) {
        RemoveItem(this.ports, key, function (key) {
            key
                .off('down', this.update, this)
                .off('up', this.update, this)

            this.update(FakeEvent);
        }, this);
        return this;
    }

    update(event) {
        //  Override the default functions (it's too late for the browser to use them anyway, so we may as well)
        if (event.cancelled === undefined) {
            //  Event allowed to flow across all handlers in this Scene, and any other Scene in the Scene list
            event.cancelled = 0;

            //  Won't reach any more local (Scene level) handlers
            event.stopImmediatePropagation = function () {
                event.cancelled = 1;
            };

            //  Won't reach any more handlers in any Scene further down the Scene list
            event.stopPropagation = function () {
                event.cancelled = -1;
            };
        }

        if (event.cancelled === -1) {
            //  This event has been stopped from broadcasting to any other Scene, so abort.
            event.cancelled = 0;
            return;
        }

        var isDown = false;
        for (var i = 0, cnt = this.ports.length; i < cnt; i++) {
            if (this.ports[i].isDown) {
                isDown = true;
                break;
            }
        }

        if (this.isDown !== isDown) {
            event = FakeEvent;
            event.timeStamp = Date.now();
            event.keyCode = this.keyCode;

            if (isDown) {
                this.onDown(event);
            } else {
                this.onUp(event);
            }

            if (!event.cancelled) {
                var eventName = ((isDown) ? 'keydown-' : 'keyup-') + KeyMap[this.keyCode];
                this.plugin.emit(eventName, event);
            }

            if (!event.cancelled) {
                var eventName = (isDown) ? 'keydown' : 'keyup';
                this.plugin.emit(eventName, event);
            }
        }

        event.cancelled = 0;
    }
}

var FakeEvent = {
    timeStamp: 0,
    keyCode: 0,
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    metaKey: false,
    location: 0,
};

export default KeyHub;