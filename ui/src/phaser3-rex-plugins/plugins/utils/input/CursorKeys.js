const Key = Phaser.Input.Keyboard.Key;
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

class CursorKeys {
    constructor(scene) {
        // scene: scene instance, or undefined
        this.cursorKeys = {
            up: new Key(scene, KeyCodes.UP),
            down: new Key(scene, KeyCodes.DOWN),
            left: new Key(scene, KeyCodes.LEFT),
            right: new Key(scene, KeyCodes.RIGHT)
        }
        this.noKeyDown = true;
    }

    shutdown(fromScene) {
        for (var key in this.cursorKeys) {
            this.cursorKeys[key].destroy();
        }
        this.cursorKeys = undefined;
    }

    destroy(fromScene) {
        shutdown(fromScene);
    }

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(keyName, isDown) {
        var key = this.cursorKeys[keyName];

        if (!key.enabled) {
            return this;
        }
        if (isDown) {
            this.noKeyDown = false;
        }

        if (key.isDown !== isDown) {
            FakeEvent.timeStamp = Date.now();
            FakeEvent.keyCode = key.keyCode;
            if (isDown) {
                key.onDown(FakeEvent);
            } else {
                key.onUp(FakeEvent);
            }
        }

        return this;
    }

    clearAllKeysState() {
        this.noKeyDown = true;
        for (var keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }
        return this;
    }

    getKeyState(keyName) {
        return this.cursorKeys[keyName];
    }

    get upKeyDown() {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown() {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown() {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown() {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown() {
        return !this.noKeyDown;
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

export default CursorKeys;
