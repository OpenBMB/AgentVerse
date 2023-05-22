var AppendText = function (value, addCR) {
    if (!value && value !== 0) {
        value = '';
    }

    if (addCR === undefined) {
        addCR = true;
    }

    if (Array.isArray(value)) {
        value = value.join('\n');
    }

    var newText;
    if (addCR) {
        newText = `${this.text}\n${value}`;
    } else {
        newText = `${this.text}${value}`;
    }

    if (newText != this.text) {
        this.setText(newText);
    }

    return this;
}

export default AppendText;