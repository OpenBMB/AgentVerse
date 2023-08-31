import { SetLastOpenedEditor } from './LastOpenedEditor.js';
import IsFunction from '../../../utils/object/IsFunction.js';
import CreateInputTextFromText from './CreateInputText.js';
import NextTick from '../../../utils/time/NextTick.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Merge = Phaser.Utils.Objects.Merge;

var Open = function (config, onCloseCallback) {
    if (config === undefined) {
        config = {};
    }
    config = Merge(config, this.openConfig)

    SetLastOpenedEditor(this);

    if (IsFunction(config)) {
        onCloseCallback = config;
        config = undefined;
    }
    if (onCloseCallback === undefined) {
        onCloseCallback = GetValue(config, 'onClose', undefined);
    }

    var onOpenCallback = GetValue(config, 'onOpen', undefined);
    var customOnTextChanged = GetValue(config, 'onTextChanged', undefined);

    this.inputText = CreateInputTextFromText(this.parent, config)
        .on('textchange', function (inputText) {
            var text = inputText.text;
            if (customOnTextChanged) { // Custom on-text-changed callback
                customOnTextChanged(this.parent, text);
            } else { // Default on-text-changed callback
                this.parent.text = text;
            }
        }, this)
        .setFocus();
    this.parent.setVisible(false); // Set parent text invisible

    // Attach close event
    this.onClose = onCloseCallback;
    if (GetValue(config, 'enterClose', true)) {
        this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
    }
    // Attach pointerdown (outside of input-text) event, at next tick
    this.delayCall = NextTick(this.scene, function () {
        this.scene.input.once('pointerdown', this.close, this);

        // Open editor completly, invoke onOpenCallback
        if (onOpenCallback) {
            onOpenCallback(this.parent);
        }
        this.emit('open', this.parent);

    }, this);

    return this;
}

export default Open;