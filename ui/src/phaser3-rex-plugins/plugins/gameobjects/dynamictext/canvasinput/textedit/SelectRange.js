var OnSelectRange = function (hiddenTextEdit) {
    var textObject = hiddenTextEdit.parent;
    // var text = textObject.text;
    var selectionStart = (hiddenTextEdit.isOpened) ? hiddenTextEdit.selectionStart : null;
    var selectionEnd = (hiddenTextEdit.isOpened) ? hiddenTextEdit.selectionEnd : null;
    var prevSelectionStart = hiddenTextEdit.prevSelectionStart;
    var prevSelectionEnd = hiddenTextEdit.prevSelectionEnd;

    if ((prevSelectionStart === selectionStart) && (prevSelectionEnd === selectionEnd)) {
        return;
    }

    var min, max;
    if (prevSelectionStart === null) {
        min = selectionStart;
        max = selectionEnd;
    } else {
        min = Math.min(prevSelectionStart, selectionStart);
        max = Math.max(prevSelectionEnd, selectionEnd);
    }

    for (var i = min; i < max; i++) {
        var inPrevSelectionRange = (prevSelectionStart === null) ? false :
            (i >= prevSelectionStart) && (i < prevSelectionEnd);
        var inSelectionRange = (i >= selectionStart) && (i < selectionEnd);


        if (inPrevSelectionRange && inSelectionRange) {
            continue;
        }

        var child = textObject.getCharChild(i);
        if (child) {
            if (inPrevSelectionRange) {
                textObject.emit('cursorout', child, i, textObject);
            } else {
                textObject.emit('cursorin', child, i, textObject);
            }
        }
    }

    hiddenTextEdit.prevSelectionStart = selectionStart;
    hiddenTextEdit.prevSelectionEnd = selectionEnd;
}

export default OnSelectRange;