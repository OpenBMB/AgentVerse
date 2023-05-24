import Pen from './Pen.js';
import CONST from '../../../textbase/const.js';
import Clone from '../../../../utils/object/Clone.js';
import NOOP from '../../../../utils/object/NOOP.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const NO_NEWLINE = CONST.NO_NEWLINE;
const WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;

class PenManager {
    constructor(config) {
        this.pens = []; // all pens
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.pensPool = config.pensPool;    // Required
        this.linesPool = config.linesPool;  // Required
        this.tagToText = GetFastValue(config, 'tagToText', NOOP);
        this.tagToTextScope = GetFastValue(config, 'tagToTextScope', undefined);
    }

    destroy() {
        this.clear();
        this.tagToText = undefined;
        this.tagToTextScope = undefined;
    }

    clear() {
        for (var i = 0, len = this.lines.length; i < len; i++) {
            this.lines[i].length = 0;
        }

        this.pensPool.pushMultiple(this.pens);
        this.linesPool.pushMultiple(this.lines);
        this.maxLinesWidth = undefined;
    }

    addTextPen(text, x, y, width, prop, newLineMode) {
        var pen = this.pensPool.pop();
        if (pen == null) {
            pen = new Pen();
        }
        PEN_CONFIG.text = text;
        PEN_CONFIG.x = x;
        PEN_CONFIG.y = y;
        PEN_CONFIG.width = width;
        PEN_CONFIG.prop = prop;
        PEN_CONFIG.newLineMode = newLineMode;
        pen.resetFromJSON(PEN_CONFIG);
        this.addPen(pen);
        return this;
    }

    addImagePen(x, y, width, prop) {
        this.addTextPen('', x, y, width, prop, NO_NEWLINE);
        return this;
    }

    addNewLinePen() {
        var previousPen = this.lastPen;
        var x = (previousPen) ? previousPen.lastX : 0;
        var y = (previousPen) ? previousPen.y : 0;
        var prop = (previousPen) ? Clone(previousPen.prop) : null;
        this.addTextPen('', x, y, 0, prop, WRAPPED_NEWLINE);
        return this;
    }

    addPen(pen) {
        var previousPen = this.lastPen;
        if (previousPen == null) {
            pen.startIndex = 0;
        } else {
            pen.startIndex = previousPen.endIndex;
        }
        this.pens.push(pen);

        // maintan lines
        var line = this.lastLine;
        if (line == null) {
            line = this.linesPool.pop() || [];
            this.lines.push(line);
        }
        line.push(pen);

        // new line, add an empty line
        if (pen.newLineMode !== NO_NEWLINE) {
            line = this.linesPool.pop() || [];
            this.lines.push(line);
        }
        this.maxLinesWidth = undefined;
    }

    clone(targetPenManager) {
        if (targetPenManager == null)
            targetPenManager = new PenManager();

        targetPenManager.clear();

        for (var li = 0, llen = this.lines.length; li < llen; li++) {
            var pens = this.lines[li];
            for (var pi = 0, plen = pens.length; pi < plen; pi++) {
                var pen = pens[pi];
                targetPenManager.addPen(
                    pen.text,
                    pen.x,
                    pen.y,
                    pen.width,
                    Clone(pen.prop),
                    pen.newLineMode
                );
            }
        }

        return targetPenManager;
    }

    get lastPen() {
        return this.pens[this.pens.length - 1];
    }

    get lastLine() {
        return this.lines[this.lines.length - 1];
    }

    getLineStartIndex(i) {
        if (i >= this.lines.length) {
            return this.getLineEndIndex(i);
        } else {
            var line = this.lines[i];
            return (line && line[0]) ? line[0].startIndex : 0;
        }
    }

    getLineEndIndex(i) {
        if (i >= this.lines.length) {
            i = this.lines.length - 1;
        }
        var li, hasLastPen = false,
            line;
        for (li = i; li >= 0; li--) {
            line = this.lines[li];
            hasLastPen = (line != null) && (line.length > 0);
            if (hasLastPen) {
                break;
            }
        }
        if (!hasLastPen) {
            return 0;
        }

        var lastPen = line[line.length - 1];
        return lastPen.endIndex;
    }

    getLineWidth(i) {
        var line = this.lines[i];
        if (!line) {
            return 0;
        }

        var lastPen = line[line.length - 1];
        if (lastPen == null) {
            return 0;
        }

        var lineWidth = lastPen.lastX; // start from 0
        return lineWidth;
    }

    getMaxLineWidth() {
        if (this.maxLinesWidth !== undefined) {
            return this.maxLinesWidth;
        }
        var w, maxW = 0;
        for (var i = 0, len = this.lines.length; i < len; i++) {
            w = this.getLineWidth(i);
            if (w > maxW) {
                maxW = w;
            }
        }
        this.maxLinesWidth = maxW;
        return maxW;
    }

    getLineWidths() {
        var result = [];
        for (var i = 0, len = this.lines.length; i < len; i++) {
            result.push(this.getLineWidth(i));
        }
        return result;
    }

    get linesCount() {
        return this.lines.length;
    }

    get plainText() {
        var txt = "",
            pens = this.pens;
        for (var i = 0, len = pens.length; i < len; i++) {
            txt += pens[i].plainText;
        }

        return txt;
    }

    get rawTextLength() {
        var l = 0,
            pens = this.pens;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            l += pens[i].rawTextLength;
        }

        return l;
    }

    getSliceTagText(start, end, wrap) {
        if (start === undefined) {
            start = 0;
        }
        if (end === undefined) {
            var lastPen = this.lastPen;
            if (lastPen == null) {
                return "";
            }

            end = lastPen.endIndex;
        }
        if (wrap === undefined) {
            wrap = false;
        }

        var txt = "",
            formatTxt,
            pen, penTxt, penStartIdx, penEndIdx, isInRange;
        var currentProp, previousProp;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            pen = this.pens[i];
            penEndIdx = pen.endIndex;
            if (penEndIdx <= start) {
                continue;
            }
            pen = this.pens[i];
            penTxt = (!wrap) ? pen.plainText : pen.wrapText;
            currentProp = pen.prop;
            penStartIdx = pen.startIndex;

            isInRange = (penStartIdx >= start) && (penEndIdx <= end);
            if (!isInRange) {
                penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
            }

            if (this.tagToTextScope) {
                txt += this.tagToText.call(this.tagToTextScope, penTxt, currentProp, previousProp);
            } else {
                txt += this.tagToText(penTxt, currentProp, previousProp);
            }

            previousProp = currentProp;
            if (penEndIdx >= end) {
                break;
            }
        }

        return txt;
    }

    get length() {
        return this.lines.length;
    }

    set length(value) {
        // Only for set length to 0 (clear)
        this.clear();
    }
};

var PEN_CONFIG = {};

export default PenManager;