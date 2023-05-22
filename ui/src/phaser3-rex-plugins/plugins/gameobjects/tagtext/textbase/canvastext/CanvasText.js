import DrawMethods from './DrawMethods.js';
import PenManager from '../penmanger/PenManager.js';
import HitAreaManager from '../hitareamanager/HitAreaManager.js';
import SetInteractive from './SetInteractive.js';
import CONST from '../../../textbase/const.js';
import WrapText from '../wraptext/WrapText.js';
import Clone from '../../../../utils/object/Clone.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const NO_WRAP = CONST.NO_WRAP;
const NO_NEWLINE = CONST.NO_NEWLINE;

class CanvasText {
    constructor(config) {
        this.parent = config.parent;
        this.scene = this.parent.scene;
        this.context = GetValue(config, 'context', null);
        this.canvas = this.context.canvas;
        this.parser = GetValue(config, 'parser', null);
        this.defaultStyle = GetValue(config, 'style', null);
        this.autoRound = true;

        this.pensPool = config.pensPool;                     // Required
        this.linesPool = config.linesPool;                   // Required
        this.wrapTextLinesPool = config.wrapTextLinesPool;   // Required

        this.penManager = this.newPenManager();
        this._tmpPenManager = null;

        this.hitAreaManager = new HitAreaManager();
        this.lastHitAreaKey = null;
        this.urlTagCursorStyle = null;

        var context = this.context;
        this.getTextWidth = function (text) {
            return context.measureText(text).width;
        }
    }

    destroy() {
        this.parent = undefined;
        this.scene = undefined;
        this.context = undefined;
        this.canvas = undefined;
        this.parser = undefined;
        this.defaultStyle = undefined;

        if (this.penManager) {
            this.penManager.destroy();
            this.penManager = undefined;
        }
        if (this._tmpPenManager) {
            this._tmpPenManager.destroy();
            this._tmpPenManager = undefined;
        }
        if (this.hitAreaManager) {
            this.hitAreaManager.destroy();
            this.hitAreaManager = undefined;
        }

        this.pensPool = undefined;
        this.linesPool = undefined;
        this.wrapTextLinesPool = undefined;
    }

    updatePenManager(text, wrapMode, wrapWidth, lineHeight, penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }
        penManager.clear();
        if (text === "") {
            return penManager;
        }

        var textStyle = this.parent.style;
        if (textStyle.isWrapFitMode) {
            var padding = this.parent.padding;
            wrapWidth = textStyle.fixedWidth - padding.left - padding.right;
        }

        var canvas = this.canvas;
        var context = this.context;

        var MeasureText = function (text) {
            return context.measureText(text).width;
        }

        var cursorX = 0,
            cursorY = 0;

        var customTextWrapCallback = textStyle.wrapCallback,
            customTextWrapCallbackScope = textStyle.wrapCallbackScope;
        var reuseLines = true;

        var plainText, curProp, curStyle;
        var match = this.parser.splitText(text),
            result, wrapLines,
            wrapTextLinesPool = this.wrapTextLinesPool;
        for (var i = 0, len = match.length; i < len; i++) {
            result = this.parser.tagTextToProp(match[i], curProp);
            plainText = result.plainText;
            curProp = result.prop;

            if (curProp.img) { // Image tag                
                var imgWidth = this.imageManager.getOuterWidth(curProp.img);
                if ((wrapWidth > 0) && (wrapMode !== NO_WRAP)) {  // Wrap mode
                    if (wrapWidth < (cursorX + imgWidth)) {
                        penManager.addNewLinePen();
                        cursorY += lineHeight;
                        cursorX = 0;
                    }
                }
                penManager.addImagePen(cursorX, cursorY, imgWidth, Clone(curProp));
                cursorX += imgWidth;

            } else if (plainText !== '') {
                // wrap text to lines
                // Save the current context.
                context.save();
                curStyle = this.parser.propToContextStyle(this.defaultStyle, curProp);
                curStyle.buildFont();
                curStyle.syncFont(canvas, context);
                curStyle.syncStyle(canvas, context);

                if (!customTextWrapCallback) {
                    wrapLines = WrapText(
                        plainText,
                        MeasureText,
                        wrapMode, wrapWidth,
                        cursorX,
                        wrapTextLinesPool
                    );
                } else { // customTextWrapCallback
                    wrapLines = customTextWrapCallback.call(customTextWrapCallbackScope,
                        plainText,
                        MeasureText,
                        wrapWidth,
                        cursorX
                    );
                    if (typeof (wrapLines) === 'string') {
                        wrapLines = wrapLines.split('\n');
                    }
                    var n;
                    for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                        n = wrapLines[j];
                        if (typeof (n) === 'string') {
                            wrapLines[j] = wrapTextLinesPool.getLine(
                                n,
                                MeasureText(n),
                                (j < (jLen - 1)) ? 2 : 0
                            );
                        } else {
                            reuseLines = false;
                        }
                    }
                }  // customTextWrapCallback

                // add pens
                var n;
                for (var j = 0, jLen = wrapLines.length; j < jLen; j++) {
                    n = wrapLines[j];
                    penManager.addTextPen(n.text, cursorX, cursorY, n.width, Clone(curProp), n.newLineMode);

                    if (n.newLineMode !== NO_NEWLINE) {
                        cursorX = 0;
                        cursorY += lineHeight;
                    } else {
                        cursorX += n.width;
                    }

                }

                if (reuseLines) {
                    wrapTextLinesPool.freeLines(wrapLines);
                }
                wrapLines = null;

                context.restore();

            }

        }

        // Add strokeThinkness to last pen of each line
        for (var i = 0, len = this.lines.length; i < len; i++) {
            var line = this.lines[i];
            var lastPen = line[line.length - 1];
            if (lastPen) {
                lastPen.width += this.parser.getStrokeThinkness(this.defaultStyle, lastPen.prop);
            }
        }

        return penManager;
    }

    get startXOffset() {
        var defaultStyle = this.defaultStyle;
        return (defaultStyle.strokeThickness / 2) + defaultStyle.xOffset;
    }

    get startYOffset() {
        var defaultStyle = this.defaultStyle;
        return (defaultStyle.strokeThickness / 2) + defaultStyle.metrics.ascent;
    }

    get lines() {
        return this.penManager.lines;
    }

    get desplayLinesCount() {
        var linesCount = this.penManager.linesCount,
            maxLines = this.defaultStyle.maxLines;
        if ((maxLines > 0) && (linesCount > maxLines)) {
            linesCount = maxLines;
        }
        return linesCount;
    }

    get linesWidth() {
        return Math.ceil(this.penManager.getMaxLineWidth());
    }

    get linesHeight() {
        var linesCount = this.desplayLinesCount;
        var linesHeight = (this.defaultStyle.lineHeight * linesCount);
        if (linesCount > 0) {
            linesHeight -= this.defaultStyle.lineSpacing;
        }
        return linesHeight;
    }

    get imageManager() {
        return this.parent.imageManager;
    }

    get rtl() {
        return this.parent.style.rtl;
    }

    newPenManager() {
        return new PenManager({
            pensPool: this.pensPool,
            linesPool: this.linesPool,
            tagToText: this.parser.propToTagText,
            tagToTextScope: this.parser
        });
    }

    get tmpPenManager() {
        if (this._tmpPenManager === null) {
            this._tmpPenManager = this.newPenManager();
        }
        return this._tmpPenManager;
    }

    getPlainText(text, start, end) {
        var plainText;
        if (text == null) {
            plainText = this.penManager.plainText;
        } else {
            var m, match = this.parser.splitText(text, 1); // PLAINTEXTONLY_MODE
            plainText = "";
            for (var i = 0, len = match.length; i < len; i++) {
                plainText += match[i];
            }
        }

        if ((start != null) || (end != null)) {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = plainText.length;
            }
            plainText = plainText.substring(start, end);
        }

        return plainText;
    }

    getPenManager(text, retPenManager) {
        if (text === undefined) {
            return this.copyPenManager(retPenManager, this.penManager);
        }

        if (retPenManager === undefined) {
            retPenManager = this.newPenManager();
        }

        var defaultStyle = this.defaultStyle;
        this.updatePenManager(
            text,
            defaultStyle.wrapMode,
            defaultStyle.wrapWidth,
            defaultStyle.lineHeight,
            retPenManager
        );
        return retPenManager;
    }

    getText(text, start, end, wrap) {
        if (text == null) {
            return this.penManager.getSliceTagText(start, end, wrap);
        }

        var penManager = this.tmpPenManager;
        var defaultStyle = this.defaultStyle;
        this.updatePenManager(
            text,
            defaultStyle.wrapMode,
            defaultStyle.wrapWidth,
            defaultStyle.lineHeight,
            penManager
        );

        return penManager.getSliceTagText(start, end, wrap);
    }

    copyPenManager(ret, src) {
        if (src === undefined) {
            src = this.penManager;
        }
        return src.copy(ret);
    }

    getTextWidth(penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }

        return penManager.getMaxLineWidth();
    }

    getLastPen(penManager) {
        if (penManager === undefined) {
            penManager = this.penManager;
        }

        return penManager.lastPen;
    }
};

var methods = {
    setInteractive: SetInteractive,
}

Object.assign(
    CanvasText.prototype,
    DrawMethods,
    methods
);

export default CanvasText;