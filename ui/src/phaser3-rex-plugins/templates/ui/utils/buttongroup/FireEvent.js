var FireEvent = function (eventName, button, ...args) {
    var index;
    if (typeof (button) === 'number') {
        index = button;
        button = this.buttons[index];
        if (!button) {
            return;
        }
    } else {
        index = this.buttons.indexOf(button);
        if (index === -1) {
            return;
        }
    }

    // Buttons is a child. Fire internal events.
    if (this.eventEmitter !== this.parent) {
        this.parent.emit(eventName, button, index, ...args);
    }

    if (this.groupName !== undefined) {
        this.eventEmitter.emit(eventName, button, this.groupName, index, ...args);
    } else {
        this.eventEmitter.emit(eventName, button, index, ...args);
    }
}

export default FireEvent;