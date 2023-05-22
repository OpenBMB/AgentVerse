import { SetLastOpenedEditor } from './LastOpenedEditor.js';
import CreateElement from './CreateElement.js';

var Open = function () {
    // Already opened
    if (this.isOpened) {
        return this;
    }
    // Read only
    if (this.readOnly) {
        return this;
    }

    SetLastOpenedEditor(this);

    this.isOpened = true;

    if (!this.node) {
        // Create input text element when opening editor
        this.node = CreateElement(this, this.nodeConfig);
    }

    this.setFocus();

    this.initText();

    if (this.enterCloseEnable) {
        this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
    }

    // There is no cursor-position-change event, 
    // so updating cursor position every tick
    this.scene.sys.events.on('postupdate', this.updateText, this);

    this.scene.input.on('pointerdown', this.onClickOutside, this);

    if (this.onOpenCallback) {
        this.onOpenCallback(this.parent, this);
    }

    this.emit('open', this);

    return this;
}

export default Open;