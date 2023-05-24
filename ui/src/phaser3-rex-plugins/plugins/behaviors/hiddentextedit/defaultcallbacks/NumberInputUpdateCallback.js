var NumberInputUpdateCallback = function (text, textObject, hiddenInputText) {
    text = text.replace(' ', '');
    var previousText = hiddenInputText.previousText;
    if (text === previousText) {
        return text;
    }

    if (isNaN(text)) {
        // Enter a NaN character, back to previous text
        hiddenInputText.emit('nan', text, hiddenInputText);

        text = previousText;
        var cursorPosition = hiddenInputText.cursorPosition - 1;
        hiddenInputText.setText(text);
        hiddenInputText.setCursorPosition(cursorPosition);
    } else {
        // New number text, update previous texr
        hiddenInputText.previousText = text;
    }

    return text;
}
export default NumberInputUpdateCallback;