import RenderBase from '../renderbase/RenderBase.js';
import { CharTypeName } from '../Types.js';
import TextStyle from './TextStyle.js';

class CharData extends RenderBase {
    constructor(
        parent,
        text,
        style
    ) {
        super(parent, CharTypeName);
        this.updateTextFlag = false;
        this.style = new TextStyle(this, style);
        this.setText(text);
    }

    get autoRound() {
        return this.parent.autoRound;
    }

    get offsetX() {
        return this.style.offsetX;
    }

    set offsetX(value) {
        if (this.style) {
            this.style.offsetX = value;
        }
    }

    get offsetY() {
        return this.style.offsetY;
    }

    set offsetY(value) {
        if (this.style) {
            this.style.offsetY = value;
        }
    }

    get leftSpace() {
        return this.style.leftSpace * this.scaleX;
    }

    set leftSpace(value) {
        if (this.style) {
            this.style.leftSpace = value;
        }
        super.leftSpace = value;
    }

    get rightSpace() {
        return this.style.rightSpace * this.scaleX;
    }

    set rightSpace(value) {
        if (this.style) {
            this.style.rightSpace = value;
        }
        super.rightSpace = value;
    }

    get align() {
        return this.style.align;
    }

    set align(value) {
        if (this.style) {
            this.style.align = value;
        }
    }

    modifyStyle(style) {
        this.setDirty(true);
        this.style.modify(style);

        if (this.updateTextFlag) {
            this.updateTextSize();
        }
        return this;
    }

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        this.modifyStyle(o);
        super.modifyPorperties(o);
        return this;
    }

    setText(text) {
        this.setDirty(this.text != text);
        this.text = text;

        this.updateTextSize();

        return this;
    }

    updateTextSize() {
        var text = this.text;
        // Is new-line, page-break, or empty character
        if ((text === '\n') || (text === '\f') || (text === '')) {
            this.textWidth = 0;
            this.textHeight = 0;
            this.ascent = 0;
            this.descent = 0;

        } else {
            var metrics = this.style.getTextMetrics(this.context, this.text);
            this.textWidth = metrics.width;

            var ascent, descent;
            if ('actualBoundingBoxAscent' in metrics) {
                ascent = metrics.actualBoundingBoxAscent;
                descent = metrics.actualBoundingBoxDescent;
            } else {
                ascent = 0;
                descent = 0;
            }

            this.textHeight = ascent + descent;
            this.ascent = ascent;
            this.descent = descent;
        }

        this.updateTextFlag = false;
        return this;
    }

    get width() {
        return this.textWidth * this.scaleX;
    }

    set width(value) {
        if (this.textWidth > 0) {
            this.scaleX = value / this.textWidth;
        } else {
            this.scaleX = 1;
        }
    }

    get height() {
        return this.textHeight * this.scaleY;
    }

    set height(value) {
        if (this.textHeight > 0) {
            this.scaleY = value / this.textHeight;
        } else {
            this.scaleY = 1;
        }
    }

    get willRender() {
        var text = this.text;
        if ((text === '\n') || (text === '\f')) {
            return false;
        }

        return super.willRender;
    }

    renderContent() {
        var context = this.context;
        var textStyle = this.style;

        if (textStyle.hasBackgroundColor) {
            context.fillStyle = textStyle.backgroundColor;

            var x = this.drawTLX;
            var width = this.drawTRX - x;

            var bottomY = textStyle.backgroundBottomY;
            if (bottomY == null) {
                bottomY = this.drawBLY;
            }
            var height = textStyle.backgroundHeight;
            if (height == null) {
                height = bottomY - this.drawTLY;
            }
            var y = bottomY - height;

            context.fillRect(x, y, width, height);
        }

        var hasFill = textStyle.hasFill,
            hasStroke = textStyle.hasStroke;

        if (!hasFill && !hasStroke) {
            return;
        }

        textStyle.syncFont(context).syncStyle(context);
        // textBaseline = 'alphabetic'

        if (hasStroke) {
            textStyle.syncShadow(context);
            context.strokeText(this.text, 0, 0);
        }

        if (hasFill) {
            textStyle.syncShadow(context);
            context.fillText(this.text, 0, 0);
        }
    }

    get drawTLX() { return -this.leftSpace; }
    get drawTLY() { return -this.ascent; }
    get drawBLX() { return -this.leftSpace; }
    get drawBLY() { return this.descent; }
    get drawTRX() { return this.textWidth + this.rightSpace; }
    get drawTRY() { return -this.ascent; }
    get drawBRX() { return this.textWidth + this.rightSpace; }
    get drawBRY() { return this.descent; }

}

export default CharData;