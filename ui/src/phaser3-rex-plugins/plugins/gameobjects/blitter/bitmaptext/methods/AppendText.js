var AppendText = function (value) {
    if (value == null) {
        value = '';
    } else if (Array.isArray(value)) {
        value = value.join('\n');
    } else {
        value = value.toString();
    }

    if (value === '') {
        return this;
    }

    this._text += value;

    this.penManager.addTextPens(value);

    return this;
}

export default AppendText;