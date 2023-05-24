import { CloseLastOpenEditor } from './LastOpenedEditor.js';

var Close = function () {
    CloseLastOpenEditor(this);

    this.parent.setVisible(true); // Set parent text visible

    if (this.inputText) {
        this.inputText.destroy();
        this.inputText = undefined;
    }

    if (this.delayCall) {
        this.delayCall.remove();
        this.delayCall = undefined;
    }

    // Remove close event
    this.scene.input.keyboard.off('keydown-ENTER', this.close, this);
    this.scene.input.off('pointerdown', this.close, this);

    if (this.onClose) {
        this.onClose(this.parent);
    }
    this.emit('close', this.parent);

    return this;
}

export default Close;
