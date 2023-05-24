import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import CopyElementConfig from './methods/CopyElementConfig.js';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HiddenTextEditBase extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;

        var textType = GetValue(config, 'inputType', undefined);
        if (textType === undefined) {
            textType = GetValue(config, 'type', 'text');
        }

        this.setEnterCloseEnable(GetValue(config, 'enterClose', (textType !== 'textarea')));

        var onOpen = GetValue(config, 'onOpen', undefined);
        if (!onOpen) {
            onOpen = GetValue(config, 'onFocus', undefined);
        }
        this.onOpenCallback = onOpen;

        var onClose = GetValue(config, 'onClose', undefined);
        if (!onClose) {
            onClose = GetValue(config, 'onBlur', undefined);
        }
        this.onCloseCallback = onClose;

        this.onUpdateCallback = GetValue(config, 'onUpdate', undefined);

        this.isOpened = false;

        gameObject
            .on('pointerdown', function () {
                this.open();
            }, this)
            .setInteractive()

        this.nodeConfig = CopyElementConfig(config);
        // Create/remove input text element when opening/closing editor
        this.node = undefined;
    }

    destroy() {
        // this.parent.off('pointerdown', this.open, this);

        this.close();

        super.destroy();
    }

    onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
            this.close();
        }
    }

    setEnterCloseEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
    }

    // Override
    initText() {
    }

    // Override
    updateText() {
    }

    // Copy from InputText class
    get text() {
        if (!this.node) {
            return '';
        }
        return this.node.value;
    }

    set text(value) {
        if (!this.node) {
            return;
        }
        this.node.value = value;
    }

    setText(value) { // Override
        this.text = value;
        return this;
    }

    get maxLength() {
        return this.nodeConfig.maxLength;
    }

    set maxLength(value) {
        this.nodeConfig.maxLength = value;

        if (this.node) {
            this.node.maxLength = value;
        }
    }

    setMaxLength(value) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        return this.nodeConfig.minLength;
    }

    set minLength(value) {
        this.nodeConfig.minLength = value;

        if (this.node) {
            this.node.minLength = value;
        }
    }

    setMinLength(value) {
        this.minLength = value;
        return this;
    }

    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        if (!this.node) {
            return;
        }
        this.node.placeholder = value;
    }

    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }

    selectText(selectionStart, selectionEnd) {
        if (!this.node) {
            return this;
        }
        if (selectionStart === undefined) {
            this.node.select();
        } else {
            this.node.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
    }

    selectAll() {
        this.selectText();
        return this;
    }

    get selectionStart() {
        if (!this.node) {
            return 0;
        }
        return this.node.selectionStart;
    }

    get selectionEnd() {
        if (!this.node) {
            return 0;
        }
        return this.node.selectionEnd;
    }

    get selectedText() {
        if (!this.node) {
            return '';
        }
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
    }

    get cursorPosition() {
        if (!this.node) {
            return 0;
        }
        return this.node.selectionStart;
    }

    set cursorPosition(value) {
        if (!this.node) {
            return;
        }
        this.node.setSelectionRange(value, value);
    }

    setCursorPosition(value) {
        if (value === undefined) {
            value = this.text.length;
        } else if (value < 0) {
            value = this.text.length + value;
        }

        this.cursorPosition = value;
        return this;
    }

    get tooltip() {
        if (!this.node) {
            return '';
        }
        return this.node.title;
    }

    set tooltip(value) {
        if (!this.node) {
            return this;
        }
        this.node.title = value;
    }

    setTooltip(value) {
        this.tooltip = value;
        return this;
    }

    setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
    }

    get readOnly() {
        return this.nodeConfig.readOnly;
    }

    set readOnly(value) {
        this.nodeConfig.readOnly = value;

        if (this.node) {
            this.node.readOnly = value;
        }
    }

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }

    get spellCheck() {
        if (!this.node) {
            return '';
        }
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        if (!this.node) {
            return;
        }
        this.node.spellcheck = value;
    }

    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }

    get fontColor() {
        if (!this.node) {
            return undefined;
        }
        return this.node.style.color;
    }

    set fontColor(value) {
        if (!this.node) {
            return;
        }
        this.node.style.color = value;
    }

    setFontColor(value) {
        this.fontColor = value;
        return this;
    }

    setStyle(key, value) {
        if (!this.node) {
            return this;
        }
        this.node.style[key] = value;
        return this;
    }

    getStyle(key) {
        if (!this.node) {
            return undefined;
        }
        return this.node.style[key];
    }

    scrollToBottom() {
        if (!this.node) {
            return this;
        }
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }

    setEnabled(enabled) {
        if (!this.node) {
            return this;
        }
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }

    setBlur() {
        if (!this.node) {
            return this;
        }
        this.node.blur();
        return this;
    }

    setFocus() {
        if (!this.node) {
            return this;
        }
        this.node.focus();
        return this;
    }

    get isFocused() {
        return this.isOpened;
    }
}

Object.assign(
    HiddenTextEditBase.prototype,
    Methods,
)

export default HiddenTextEditBase;