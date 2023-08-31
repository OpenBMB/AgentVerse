const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    setButtonsType(config) {
        if (config === undefined) {
            config = {};
        }

        var buttonsType = GetValue(config, 'buttonsType', config.type);
        this.buttonsType = buttonsType;

        if (!this.buttonsType) {
            return this;
        }

        // Assign this.setValueCallback, this.setValueCallbackScope
        var setValueCallback, setValueCallbackScope;
        setValueCallback = GetValue(config, 'setValueCallback', undefined);
        setValueCallbackScope = GetValue(config, 'setValueCallbackScope', undefined);
        if (setValueCallback === undefined) {
            setValueCallback = GetValue(config, 'setButtonStateCallback', undefined);
            setValueCallbackScope = GetValue(config, 'setButtonStateCallbackScope', undefined);
        }
        this.setValueCallback = setValueCallback;
        this.setValueCallbackScope = setValueCallbackScope;

        switch (buttonsType) {
            case 'radio':
                this.setRadioType();
                break;
            case 'checkboxes':
                this.setCheckboxesType();
                break;
        }

        return this;
    },

    setRadioType() {
        var parent = this.parent,
            buttons = this.buttons;
        parent._value = undefined;
        var selectedIndex = undefined;
        Object.defineProperty(parent, 'value', {
            get: function () {
                return parent._value;
            },
            set: function (newValue) {
                if (parent._value === newValue) {
                    return;
                }

                parent._value = newValue;

                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    var button = buttons[i];
                    if (button.rexSizer.hidden) {
                        continue;
                    }

                    if (selectedIndex === undefined) {
                        if (button.name === newValue) {
                            button.selected = true;
                        } else {
                            button.selected = false;
                        }
                    } else {
                        if (selectedIndex === i) {
                            button.selected = true;
                        } else {
                            button.selected = false;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        parent.on('button.click', function (button) {
            selectedIndex = this.buttons.indexOf(button);
            parent.value = button.name;
            selectedIndex = undefined;
        }, this);

        return this;
    },

    setCheckboxesType() {
        var parent = this.parent;
        parent.on('button.click', function (button) {
            button.selected = !button.selected;
        });

        return this;
    },

    // Common
    clearAllButtonsState() {
        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var button = buttons[i];
            button.selected = false;
        }
        return this;
    },

    getAllButtonsState() {
        var states = {};
        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var button = buttons[i];
            if (button.rexSizer.hidden) {
                continue;
            }
            states[button.name] = button.selected;
        }
        return states;
    },

    // For radio
    setSelectedButtonName(name) {
        this.parent.value = name;
        return this;
    },

    getSelectedButtonName() {
        return this.parent.value;
    },

    // For checkboxes
    setButtonState(name, state) {
        if (state === undefined) {
            state = true;
        }

        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var button = buttons[i];
            if (button.rexSizer.hidden) {
                continue;
            }
            if (button.name === name) {
                button.selected = state;
                break;
            }
        }
        return this;
    },

    getButtonState(name) {
        var buttons = this.buttons;
        for (var i = 0, cnt = buttons.length; i < cnt; i++) {
            var button = buttons[i];
            if (button.rexSizer.hidden) {
                continue;
            }
            if (button.name === name) {
                return button.selected;
            }
        }
        return undefined;
    }
}