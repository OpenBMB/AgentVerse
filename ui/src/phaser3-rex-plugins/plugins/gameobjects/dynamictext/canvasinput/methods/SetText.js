import { diffChars } from '../../../../utils/jsdiff/index.js'

const RemoveItem = Phaser.Utils.Array.Remove;

var SetText = function (textObject, newText) {
    var text = textObject.text;
    if (newText === text) {
        return;
    }

    // textObject.setText(newText);

    // Remove lastInsertCursor directly 
    RemoveItem(textObject.children, textObject.lastInsertCursor);

    if (newText === '') {
        textObject.removeChildren();
    } else {
        var results = diffChars(text, newText);
        var charIndex = 0;
        for (var i = 0, cnt = results.length; i < cnt; i++) {
            var result = results[i];
            if (result.removed) {
                // Remove character at charIndex
                textObject.removeText(charIndex, result.count);
            } else if (result.added) {
                textObject.insertText(charIndex, result.value);
                charIndex += result.count;
            } else {
                charIndex += result.count;
            }
        }
    }

    // Push back lastInsertCursor directly
    textObject.children.push(textObject.lastInsertCursor);

    textObject.runWordWrap();
}

export default SetText;