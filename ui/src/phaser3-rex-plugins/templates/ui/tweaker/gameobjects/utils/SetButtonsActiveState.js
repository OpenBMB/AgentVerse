var SetButtonsActiveStateByIndex = function (buttons, index) {
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        var button = buttons[i];
        if (!button) {
            continue;
        }

        button.setActiveState(i === index);
    }
}

export default SetButtonsActiveStateByIndex;