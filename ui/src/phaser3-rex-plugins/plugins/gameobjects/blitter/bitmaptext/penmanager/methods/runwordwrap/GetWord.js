var GetWord = function (pens, startIndex, charMode, result) {
    if (result === undefined) {
        result = { word: [], width: 0 };
    }

    result.word.length = 0;

    var endIndex = pens.length;
    var currentIndex = startIndex;
    var word = result.word, wordWidth = 0;
    while (currentIndex < endIndex) {
        var pen = pens[currentIndex];
        var char = pen.char;
        if ((char !== undefined) && (char !== ' ') && (char !== '\n')) {
            word.push(pen);
            wordWidth += pen.outerWidth;
            currentIndex++;
            // Continue
        } else {  // Get non-text pen, a space, or a new-line
            if (currentIndex === startIndex) { // Single pen
                word.push(pen);
                wordWidth += pen.outerWidth;
            }
            break;
        }

        if (charMode) {  // Word only contains 1 character
            break;
        }
    }

    result.width = wordWidth;
    return result;
}

export default GetWord;