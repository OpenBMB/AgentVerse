var IsInvalidLine = function (line) {
    // Is empty line
    if (line.length === 0 || !line.trim()) {
        return true;
    }
    // Is comment line
    if (line.trimStart().substring(0, 2) === '//') {
        return true;
    }
}

export default IsInvalidLine;