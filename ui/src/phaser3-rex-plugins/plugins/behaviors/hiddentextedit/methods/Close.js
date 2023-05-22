import { CloseLastOpenEditor } from './LastOpenedEditor.js';
import RemoveElement from './RemoveElement.js';

var Close = function () {
    // Already closed
    if (!this.isOpened) {
        return this;
    }

    CloseLastOpenEditor(this);

    this.setBlur();

    this.isOpened = false;

    this.updateText();

    this.scene.sys.events.off('postupdate', this.updateText, this);

    this.scene.input.off('pointerdown', this.onClickOutside, this);

    if (this.onCloseCallback) {
        this.onCloseCallback(this.parent, this);
    }

    // Remove input text element when closing editor
    RemoveElement(this.node);
    this.node = undefined;

    this.emit('close', this);

    return this;
}

export default Close;