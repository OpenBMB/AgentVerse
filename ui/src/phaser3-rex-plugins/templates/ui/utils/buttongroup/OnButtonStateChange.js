var OnButtonStateChange = function (button, value, previousValue) {
    if (!button) {
        return;
    }

    var callback = this.setValueCallback;
    var scope = this.setValueCallbackScope;
    if (callback) {
        if (scope) {
            callback.call(scope, button, value, previousValue);
        } else {
            callback(button, value, previousValue);
        }
    }

    this.fireEvent('button.statechange', button, value, previousValue);
}

export default OnButtonStateChange;