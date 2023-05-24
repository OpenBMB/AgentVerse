const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

var KeyMap = {};
for (var key in KeyCodes) {
    KeyMap[KeyCodes[key]] = key;
}

export default KeyMap;