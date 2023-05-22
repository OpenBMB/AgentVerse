/*
Skip line
- An empty line, only has space
- A comment line, start with commentLineStart ('//')
*/

var PreProcess = function (parser, source) {
    var comentLineStart = parser.commentLineStart;
    var lines = source.split('\n');
    for (var i = 0, cnt = lines.length; i < cnt; i++) {
        var line = lines[i];
        if (line === '') {
            // Do nothing

        } else if (line.trim().length === 0) {
            // An empty line, only has space
            lines[i] = '';

        } else if (comentLineStart && line.startsWith(comentLineStart)) {
            // A comment line, start with commentLineStart ('//')
            lines[i] = '';
        }
    }

    return lines.join('');
}

export default PreProcess;