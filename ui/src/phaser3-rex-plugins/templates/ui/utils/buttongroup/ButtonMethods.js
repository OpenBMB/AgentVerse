// Include in ButtonGroup class and Buttons/GridButtons/FixedWidthButtons class

import GetGameObjectByName from '../GetGameObjectByName.js';
import { Show, Hide, IsShown } from '../Hide.js';

export default {
    getButton(index) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons,
            button;
        var indexType = typeof (index);
        switch (indexType) {
            case 'number':
                button = buttons[index];
                break;
            case 'string':
                button = GetGameObjectByName(buttons, index);
                break;
            default:
                button = index;
                if (buttons.indexOf(button) === -1) {
                    button = undefined;
                }
                break;
        }
        return button;
    },

    setButtonEnable(index, enabled) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            enabled = index;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                buttons[i]._click.setEnable(enabled);
            }
        } else {
            this.getButton(index)._click.setEnable(enabled);
        }
        return this;
    },

    toggleButtonEnable(index) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        if ((index === undefined) || (typeof (index) === 'boolean')) {
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                buttons[i]._click.toggleEnable();
            }
        } else {
            this.getButton(index)._click.toggleEnable();
        }
        return this;
    },

    getButtonEnable(index) {
        if (index === undefined) {
            index = 0;
        }
        return this.getButton(index)._click.enable;
    },

    emitButtonClick(index) {
        // index or button game object
        // this: buttonGroup or button-sizer
        var buttonGroup = (this.buttonGroup) ? this.buttonGroup : this;
        buttonGroup.fireEvent('button.click', index);
        return this;
    },

    showButton(index) {
        Show(this.getButton(index));
        return this;
    },

    hideButton(index) {
        Hide(this.getButton(index));
        return this;
    },

    isButtonShown(index) {
        IsShown(this.getButton(index));
        return this;
    },

    forEachButtton(callback, scope) {
        // buttonGroup and button-sizer have *buttons* member both
        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            if (scope) {
                callback.call(scope, buttons[i], i, buttons);
            } else {
                callback(buttons[i], i, buttons);
            }
        }
        return this;
    },


}