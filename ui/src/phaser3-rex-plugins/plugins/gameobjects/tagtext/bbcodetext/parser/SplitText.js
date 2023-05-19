var SplitText = function (text, mode) {
    var TagRegex = this.tagRegex;

    var result = [];
    var charIdx = 0;
    var rawMode = false,
        escMode = false;
    while (true) {
        var regexResult = TagRegex.RE_SPLITTEXT.exec(text);
        if (!regexResult) {
            break;
        }

        var match = regexResult[0];
        if (escMode) {
            if (TagRegex.RE_ESC_CLOSE.test(match)) {
                escMode = false;
            } else {
                continue; // Skip other tags
            }

        } else if (rawMode) {
            if (TagRegex.RE_RAW_CLOSE.test(match)) {
                rawMode = false;
            } else {
                continue; // Skip other tags
            }

        } else {
            if (TagRegex.RE_ESC_OPEN.test(match)) {
                escMode = true;
            } else if (TagRegex.RE_RAW_OPEN.test(match)) {
                rawMode = true;
            }
        }

        var matchEnd = TagRegex.RE_SPLITTEXT.lastIndex;
        var matchStart = matchEnd - match.length;

        if (charIdx < matchStart) {
            var content = text.substring(charIdx, matchStart);
            result.push(content);
        }

        if (mode === undefined) {
            result.push(match);
        }

        charIdx = matchEnd;
    }

    var totalLen = text.length;
    if (charIdx < totalLen) { // Push remainder string
        result.push(text.substring(charIdx, totalLen));
    }

    return result; // [text,...]
}

export default SplitText;