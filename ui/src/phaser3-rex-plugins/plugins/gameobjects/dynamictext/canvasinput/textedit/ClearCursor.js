var ClearCursor = function (hiddenTextEdit) {
    var prevCursorPosition = hiddenTextEdit.prevCursorPosition;
    if (prevCursorPosition === null) {
        return;
    }

    var textObject = hiddenTextEdit.parent;

    var child = textObject.getCharChild(prevCursorPosition);
    if (child) {
        textObject.emit('cursorout', child, prevCursorPosition, textObject);
    }

    hiddenTextEdit.prevCursorPosition = null;
}
export default ClearCursor;