var OnPointerOverCallback = function (button) {
    if (button.setHoverState) {
        button.setHoverState(true);
    }
}

var OnPointerOutCallback = function (button) {
    if (button.setHoverState) {
        button.setHoverState(false);
    }
}

var OnChoiceButtonStateChange = function (button, groupName, index, value) {
    if (button.setActiveState) {
        button.setActiveState(value);
    }
}

var OnButtonEnable = function (button) {
    if (button.setDisableState) {
        button.setDisableState(false);
    }
}

var OnButtonDisable = function (button) {
    if (button.setDisableState) {
        button.setDisableState(true);
    }
}

var RegisterEvents = function () {
    this
        .on('button.over', OnPointerOverCallback)
        .on('button.out', OnPointerOutCallback)
        .on('button.enable', OnButtonEnable)
        .on('button.disable', OnButtonDisable)
        .on('button.statechange', OnChoiceButtonStateChange)

}

export default RegisterEvents;