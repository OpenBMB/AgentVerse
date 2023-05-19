var SetTextFormatCallback = function (callback, scope) {
    this.textFormatCallback = callback;
    this.textFormatCallbackScope = scope;
    return this;
}

var GetFormatText = function (value) {
    if (value === undefined) {
        value = this.value;
    }

    var text;
    if (this.textFormatCallbackScope) {
        text = this.textFormatCallback(value);
    } else {
        text = this.textFormatCallback.call(this.textFormatCallbackScope, value);
    }
    return text;
}

var UpdateText = function (value) {
    var textObject = this.sizerChildren.text;
    if (textObject && this.textFormatCallback) {
        textObject.setText(GetFormatText.call(this, value));
        if (textObject.layout) {
            textObject.layout();
        }
    }
    return this;
}

export default {
    setTextFormatCallback: SetTextFormatCallback,
    getFormatText: GetFormatText,
    updateText: UpdateText
}