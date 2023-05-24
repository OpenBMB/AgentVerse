import CreateLabel from '../../utils/build/CreateLabel.js';

var ResetDisplayContent = function (config) {
    if (config === undefined) {
        config = {};
    }

    ResetTitle.call(this, config);
    ResetContent.call(this, config);
    ResetActions.call(this, config);
    ResetChoices.call(this, config);

    return this;
}

var ResetTitle = function (config) {
    var title = this.childrenMap.title;
    title.resetDisplayContent(config.title);
}

var ResetContent = function (config) {
    var content = this.childrenMap.content;
    if (content.resetDisplayContent) {
        // Label
        content.resetDisplayContent(config.content);
    } else {
        // TextArea
        var text = config.content || '';
        content.setText(text)
    }
}

var ResetActions = function (config) {
    var actionButtons = this.childrenMap.actions;
    if (!actionButtons) {
        return;
    }

    var buttonContentArray = config.buttons;
    if (!buttonContentArray) {
        var buttonA = actionButtons[0];
        if (buttonA) {
            buttonA.resetDisplayContent(config.buttonA);
        }

        var buttonB = actionButtons[1];
        if (buttonB) {
            buttonB.resetDisplayContent(config.buttonB);
        }

    } else {
        var scene = this.scene;
        var defaultActionConfig = this.defaultActionConfig;
        var defaultActionButtonCreator = this.defaultActionButtonCreator;
        for (var i = 0, cnt = buttonContentArray.length; i < cnt; i++) {
            var buttonContent = buttonContentArray[i];
            var button = actionButtons[i];
            if (!button) {
                button = CreateLabel(scene, defaultActionConfig, defaultActionButtonCreator);
                this.addAction(button);
            }
            button.show().resetDisplayContent(buttonContent);
        }

        this.buttonMode = buttonContentArray.length;

        for (var i = buttonContentArray.length, cnt = actionButtons.length; i < cnt; i++) {
            actionButtons[i].hide();
        }
    }
}

var ResetChoices = function (config) {
    var choices = this.childrenMap.choices;
    if (!choices) {
        return;
    }

    var buttonContentArray = config.choices;
    if (!buttonContentArray) {
        buttonContentArray = [];
    }

    var scene = this.scene;
    var defaultChoiceConfig = this.defaultChoiceConfig;
    var defaultActionButtonCreator = this.defaultActionButtonCreator;
    for (var i = 0, cnt = buttonContentArray.length; i < cnt; i++) {
        var buttonContent = buttonContentArray[i];
        if (typeof (buttonContent) === 'string') {
            buttonContent = { text: buttonContent };
        }

        var button = choices[i];
        if (!button) {
            button = CreateLabel(scene, defaultChoiceConfig, defaultActionButtonCreator);
            this.addChoice(button);
        }

        button.show().resetDisplayContent(buttonContent)

        var optionValue;
        if (buttonContent.hasOwnProperty('value')) {
            optionValue = buttonContent.value;
        } else {
            optionValue = buttonContent.text;
        }
        button.setName(optionValue)
    }

    for (var i = buttonContentArray.length, cnt = choices.length; i < cnt; i++) {
        choices[i].hide();
    }
}

export default ResetDisplayContent;