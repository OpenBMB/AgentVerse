import Pool from '../../../../pool.js';

class WrapTextLinesPool extends Pool {
    freeLine(line) {
        if (!line) {
            return;
        }
        this.push(line);
        return this;
    }

    freeLines(lines) {
        if (!lines) {
            return;
        }
        this.pushMultiple(lines);
        return this;
    }

    getLine(text, width, newLineMode) {
        var l = this.pop();
        if (l === null) {
            l = {};
        }
        l.text = text;
        l.width = width;
        l.newLineMode = newLineMode;
        return l;
    }

}


export default WrapTextLinesPool;