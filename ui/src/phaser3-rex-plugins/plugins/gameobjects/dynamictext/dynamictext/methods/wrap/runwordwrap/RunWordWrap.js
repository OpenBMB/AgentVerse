import { SetPadding } from '../../../../../../utils/padding/PaddingMethods.js';
import GetWord from './GetWord.js';
import AlignLines from './AlignLines.js';
import { IsNewLineChar, IsPageBreakChar } from '../../../bob/Types.js';
import GetDefaultTextHeight from './GetDefaultTextHeight.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RunWordWrap = function (config) {
    // Parse parameters
    var startIndex = GetValue(config, 'start', 0);

    SetPadding(this.wrapPadding, GetValue(config, 'padding', 0));
    var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
    var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

    // Get lineHeight, maxLines
    var lineHeight = GetValue(config, 'lineHeight');
    var ascent = GetValue(config, 'ascent', lineHeight);
    var maxLines;
    if (lineHeight === undefined) {
        // Calculate lineHeight
        var useDefaultTextHeight = GetValue(config, 'useDefaultTextHeight', false);
        maxLines = GetValue(config, 'maxLines', 0);
        if ((this.fixedHeight > 0) && (!useDefaultTextHeight)) {
            var innerHeight = this.fixedHeight - paddingVertical;
            if (maxLines > 0) {
                // Calculate lineHeight via maxLines, in fixedHeight mode
                lineHeight = innerHeight / maxLines;
            } else {
                var textHeightResult = GetDefaultTextHeight.call(this);
                lineHeight = textHeightResult.height;
                ascent = textHeightResult.ascent;
                // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
                maxLines = Math.floor((innerHeight - ascent) / lineHeight);
            }
        } else {
            var textHeightResult = GetDefaultTextHeight.call(this);
            lineHeight = textHeightResult.height;
            ascent = textHeightResult.ascent;
        }

    } else {
        // Calculate maxLines
        if (this.fixedHeight > 0) {
            // Calculate maxLines via lineHeight, in fixedHeight mode
            maxLines = GetValue(config, 'maxLines');
            if (maxLines === undefined) {
                var innerHeight = this.fixedHeight - paddingVertical;
                maxLines = Math.floor(innerHeight / lineHeight);
            }
        } else {
            maxLines = GetValue(config, 'maxLines', 0); // Default is show all lines
        }

    }

    // If ascent is undefined, assign to lineHeight
    if (ascent === undefined) {
        ascent = lineHeight;
    }

    var showAllLines = (maxLines === 0);

    // Get wrapWidth
    var wrapWidth = GetValue(config, 'wrapWidth', undefined);
    if (wrapWidth === undefined) {
        if (this.fixedWidth > 0) {
            wrapWidth = this.fixedWidth - paddingHorizontal;
        } else {
            wrapWidth = Infinity; // No word-wrap
        }
    }

    var letterSpacing = GetValue(config, 'letterSpacing', 0);

    var hAlign = GetValue(config, 'hAlign', 0);
    var vAlign = GetValue(config, 'vAlign', 0);

    var charWrap = GetValue(config, 'charWrap', false);

    var result = {
        callback: 'runWordWrap',
        start: startIndex,  // Next start index
        isLastPage: false,  // Is last page
        padding: this.wrapPadding,
        ascent: ascent,
        lineHeight: lineHeight,
        maxLines: maxLines,
        wrapWidth: wrapWidth,
        letterSpacing: letterSpacing,
        hAlign: hAlign,
        vAlign: vAlign,
        charWrap: charWrap,
        children: [],       // Word-wrap result
        lines: [],          // Word-wrap result in lines
        maxLineWidth: 0,
        linesHeight: 0
    }

    // Set all children to inactive
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        children[i].setActive(false);
    }

    // Layout children
    wrapWidth += letterSpacing;
    var startX = this.padding.left + this.wrapPadding.left,
        startY = this.padding.top + this.wrapPadding.top + ascent,  // Start(baseline) from ascent, not 0
        x = startX,
        y = startY;
    var remainderWidth = wrapWidth,
        childIndex = startIndex,
        lastChildIndex = children.length;
    var resultChildren = result.children;
    var resultLines = result.lines,
        lastLine = [], lastLineWidth = 0, maxLineWidth = 0;
    var wordResult;
    while (childIndex < lastChildIndex) {
        wordResult = GetWord(children, childIndex, charWrap, wordResult);
        var word = wordResult.word;
        var charCnt = word.length;
        var wordWidth = wordResult.width + (charCnt * letterSpacing);

        childIndex += charCnt;
        // Next line
        var isNewLineChar = IsNewLineChar(word[0]);
        var isPageBreakChar = IsPageBreakChar(word[0]);
        var isControlChar = isNewLineChar || isPageBreakChar;
        if ((remainderWidth < wordWidth) || isControlChar) {
            // Add to result
            if (isControlChar) {
                var char = word[0];
                char.setActive().setPosition(x, y);
                resultChildren.push(char);
                lastLine.push(char);
            }

            // Move cursor
            x = startX;
            y += lineHeight;
            remainderWidth = wrapWidth;
            resultLines.push({ children: lastLine, width: lastLineWidth });
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);

            lastLineWidth = 0;
            lastLine = [];

            var isPageEnd = isPageBreakChar ||
                (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
            if (isPageEnd) {
                break;
            } else if (isControlChar) {  // Already add to result
                continue;
            }
        }
        remainderWidth -= wordWidth;
        lastLineWidth += wordWidth;

        for (var i = 0, cnt = word.length; i < cnt; i++) {
            var child = word[i];
            child.setActive();
            resultChildren.push(child);
            lastLine.push(child);

            if (child.renderable) {
                child.setPosition(x, y);
                x += (child.outerWidth + letterSpacing);
            }
        }
    }

    if (lastLine.length > 0) {
        resultLines.push({ children: lastLine, width: lastLineWidth });
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }

    result.start += resultChildren.length;
    result.isLastPage = (result.start === lastChildIndex);
    result.maxLineWidth = maxLineWidth;
    result.linesHeight = (resultLines.length * lineHeight);

    // Calculate size of game object
    var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.maxLineWidth + paddingHorizontal);
    var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.linesHeight + paddingVertical);

    // Size might be changed after wrapping
    var innerWidth = width - paddingHorizontal;
    var innerHeight = height - paddingVertical;
    AlignLines(result, innerWidth, innerHeight);

    // Resize
    this.setCanvasSize(width, height);

    // Set initial position
    for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
        var child = resultChildren[i];
        if (!child.renderable) {
            continue;
        }
        child.x0 = child.x;
        child.y0 = child.y;
    }

    return result;
};

export default RunWordWrap;