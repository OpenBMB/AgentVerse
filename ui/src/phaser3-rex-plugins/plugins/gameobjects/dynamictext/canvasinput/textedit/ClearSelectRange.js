var ClearSelectRange = function (hiddenTextEdit) {
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    if (prevSelectionStart === null) {
        return;
    }

    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;

    var textObject = hiddenTextEdit.parent;
    for (var i = prevSelectionStart; i < prevSelectionEnd; i++) {
        var child = textObject.getCharChild(i);
        if (child) {
            textObject.emit('cursorout', child, i, textObject);
        }
    }

    hiddenTextEdit.prevSelectionStart = null;
    hiddenTextEdit.prevSelectionEnd = null;
}

export default ClearSelectRange;