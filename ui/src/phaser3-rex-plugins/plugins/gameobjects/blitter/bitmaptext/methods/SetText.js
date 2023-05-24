var SetText = function (value) {
    if (value == null) {
        value = '';
    } else if (Array.isArray(value)) {
        value = value.join('\n');
    } else {
        value = value.toString();
    }

    if (value === this._text) {
        return this;
    }

    this._text = value;

    this.penManager.setTextPens(value);

    return this;
}

export default SetText;