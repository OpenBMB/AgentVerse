var MoveCursor = function (hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    var text = textObject.text;

    var cursorPosition = hiddenTextEdit.cursorPosition;
    if (hiddenTextEdit.prevCursorPosition === cursorPosition) {
        return;
    }

    if (hiddenTextEdit.prevCursorPosition !== null) {
        if (hiddenTextEdit.prevCursorPosition > text.length) {
            hiddenTextEdit.prevCursorPosition = null;
        }
    }

    if (hiddenTextEdit.prevCursorPosition !== null) {
        var child = textObject.getCharChild(hiddenTextEdit.prevCursorPosition);
        if (child) {
            textObject.emit('cursorout', child, hiddenTextEdit.prevCursorPosition, textObject);
        }
    }
    if (cursorPosition != null) {
        var child = textObject.getCharChild(cursorPosition);
        if (child) {
            textObject.emit('cursorin', child, cursorPosition, textObject);
        }
    }
    textObject.emit('movecursor', cursorPosition, hiddenTextEdit.prevCursorPosition, textObject);

    hiddenTextEdit.prevCursorPosition = cursorPosition;
}

export default MoveCursor;