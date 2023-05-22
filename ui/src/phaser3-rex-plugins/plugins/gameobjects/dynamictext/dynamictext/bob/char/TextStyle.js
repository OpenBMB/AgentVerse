import GetStyle from '../../../../../utils/canvas/GetStyle.js';
import GetProperty from '../utils/GetProperty.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextStyle {
    constructor(parent, config) {
        this.parent = parent;
        this.set(config);
    }

    toJSON() {
        return {
            bold: this.bold,
            italic: this.italic,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            color: this.color,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness,
            shaodwColor: this.shadowColor,
            shadowBlur: this.shadowBlur,
            shadowOffsetX: this.shadowOffsetX,
            shadowOffsetY: this.shadowOffsetY,
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            leftSpace: this.leftSpace,
            rightSpace: this.rightSpace,
            backgroundHeight: this.backgroundHeight,
            backgroundBottomY: this.backgroundBottomY,
            align: this.align
        }
    }

    set(o) {
        this.setBold(GetValue(o, 'bold', false));
        this.setItalic(GetValue(o, 'italic', false));
        this.setFontSize(GetValue(o, 'fontSize', '16px'));
        this.setFontFamily(GetValue(o, 'fontFamily', 'Courier'));
        this.setColor(GetValue(o, 'color', '#fff'));
        this.setStrokeStyle(
            GetValue(o, 'stroke', null),
            GetValue(o, 'strokeThickness', 0)
        );
        this.setShadow(
            GetValue(o, 'shadowColor', null),
            GetValue(o, 'shadowOffsetX', 0),
            GetValue(o, 'shadowOffsetY', 0),
            GetValue(o, 'shadowBlur', 0)
        );
        this.setOffset(
            GetValue(o, 'offsetX', 0),
            GetValue(o, 'offsetY', 0)
        );
        this.setSpace(
            GetValue(o, 'leftSpace', 0),
            GetValue(o, 'rightSpace', 0)
        );
        this.setAlign(GetValue(o, 'align', undefined));
        this.setBackgroundColor(GetValue(o, 'backgroundColor', null));
        this.setBackgroundHeight(GetValue(o, 'backgroundHeight', undefined));
        this.setBackgroundBottomY(GetValue(o, 'backgroundBottomY', undefined));

        return this;
    }

    modify(o) {
        if (o.hasOwnProperty('bold')) {
            this.setBold(o.bold);
        }
        if (o.hasOwnProperty('italic')) {
            this.setItalic(o.italic);
        }
        if (o.hasOwnProperty('fontSize')) {
            this.setFontSize(o.fontSize);
        }
        if (o.hasOwnProperty('fontFamily')) {
            this.setFontFamily(o.fontFamily);
        }
        if (o.hasOwnProperty('color')) {
            this.setColor(o.color);
        }
        if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
            this.setStrokeStyle(
                GetProperty('stroke', o, this),
                GetProperty('strokeThickness', o, this)
            );
        }

        if (o.hasOwnProperty('shadowColor')) {
            this.setShadowColor(o.shadowColor);
        }

        if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
            this.setShadowOffset(
                GetProperty('shadowOffsetX', o, this),
                GetProperty('shadowOffsetY', o, this),
            );
        }

        if (o.hasOwnProperty('shadowBlur')) {
            this.setShadowBlur(o.shaodwBlur);
        }

        if (o.hasOwnProperty('offsetX')) {
            this.setOffsetX(o.offsetX);
        }
        if (o.hasOwnProperty('offsetY')) {
            this.setOffsetY(o.offsetY);
        }

        if (o.hasOwnProperty('leftSpace')) {
            this.setLeftSpace(o.leftSpace);
        }
        if (o.hasOwnProperty('rightSpace')) {
            this.setRightSpace(o.rightSpace);
        }

        if (o.hasOwnProperty('align')) {
            this.setAlign(o.align);
        }

        if (o.hasOwnProperty('backgroundColor')) {
            this.setBackgroundColor(o.backgroundColor);
        }

        if (o.hasOwnProperty('backgroundHeight')) {
            this.setBackgroundHeight(o.backgroundHeight);
        }
        if (o.hasOwnProperty('backgroundBottomY')) {
            this.setBackgroundBottomY(o.backgroundBottomY);
        }

        return this;
    }

    setUpdateTextFlag() {
        if (this.parent) {
            this.parent.updateTextFlag = true;
        }
        return this;
    }

    clone() {
        return new TextStyle(null, this.toJSON());
    }

    copyFrom(sourceTextStyle) {
        this.set(sourceTextStyle.toJSON());
        return this;
    }

    copyTo(targetTextStyle) {
        targetTextStyle.set(this.toJSON());
        return this;
    }

    setBold(value) {
        if (value === undefined) {
            value = true;
        }
        this.bold = value;
        this.setUpdateTextFlag();
        return this;
    }

    setItalic(value) {
        if (value === undefined) {
            value = true;
        }
        this.italic = value;
        this.setUpdateTextFlag();
        return this;
    }

    get fontStyle() {
        if (this.bold && this.italic) {
            return 'bold italic';
        } else if (this.bold) {
            return 'bold';
        } else if (this.italic) {
            return 'italic';
        } else {
            return '';
        }
    }

    setFontSize(fontSize) {
        if (typeof (fontSize) === 'number') {
            fontSize = `${fontSize}px`;
        }
        this.fontSize = fontSize;
        this.setUpdateTextFlag();
        return this;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.setUpdateTextFlag();
        return this;
    }

    get font() {
        return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
    }

    setColor(color) {
        this.color = GetStyle(color);
        return this;
    }

    get hasFill() {
        return this.color != null;
    }

    setStrokeStyle(stroke, strokeThickness) {
        this.stroke = GetStyle(stroke);
        if (strokeThickness !== undefined) {
            this.strokeThickness = strokeThickness;
        }
        return this;
    }

    setStrokeThickness(strokeThickness) {
        this.strokeThickness = strokeThickness;
        return this;
    }

    get hasStroke() {
        return (this.stroke != null) && (this.strokeThickness > 0);
    }

    setShadowColor(color) {
        this.shadowColor = GetStyle(color);
        return this;
    }

    setShadowOffset(offsetX, offsetY) {
        if (offsetX === undefined) {
            offsetX = 0
        }
        if (offsetY === undefined) {
            offsetY = 0
        }

        this.shadowOffsetX = offsetX;
        this.shadowOffsetY = offsetY;
        return this;
    }

    setShadowBlur(blur) {
        if (blur === undefined) {
            blur = 0
        }

        this.shaodwBlur = blur;
        return this;
    }

    setShadow(color, offsetX, offsetY, blur) {
        this
            .setShadowColor(color)
            .setShadowOffset(offsetX, offsetY)
            .setShadowBlur(blur);
        return this;
    }

    setBackgroundColor(color) {
        this.backgroundColor = GetStyle(color);
        return this;
    }

    get hasBackgroundColor() {
        return this.backgroundColor != null;
    }

    setBackgroundHeight(height) {
        this.backgroundHeight = height;
        return this;
    }

    setBackgroundBottomY(y) {
        this.backgroundBottomY = y;
        return this;
    }

    setOffsetX(offsetX) {
        if (offsetX === undefined) {
            offsetX = 0
        }

        this.offsetX = offsetX;
        return this;
    }

    setOffsetY(offsetY) {
        if (offsetY === undefined) {
            offsetY = 0
        }

        this.offsetY = offsetY;
        return this;
    }

    setOffset(offsetX, offsetY) {
        this
            .setOffsetX(offsetX)
            .setOffsetY(offsetY);
        return this;
    }

    setLeftSpace(space) {
        if (space === undefined) {
            space = 0
        }

        this.leftSpace = space;
        return this;
    }

    setRightSpace(space) {
        if (space === undefined) {
            space = 0
        }

        this.rightSpace = space;
        return this;
    }

    setSpace(leftSpace, rightSpace) {
        this
            .setLeftSpace(leftSpace)
            .setRightSpace(rightSpace);
        return this;
    }

    setAlign(align) {
        this.align = align;
        return this;
    }

    syncFont(context) {
        context.font = this.font;
        return this;
    }

    syncStyle(context) {
        context.textBaseline = 'alphabetic';

        var hasFill = this.hasFill;
        var hasStroke = this.hasStroke;
        context.fillStyle = (hasFill) ? this.color : '#000';

        context.strokeStyle = (hasStroke) ? this.stroke : '#000';
        context.lineWidth = (hasStroke) ? this.strokeThickness : 0;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        return this;
    }

    syncShadow(context) {
        if (context.shadowColor != null) {
            context.shadowColor = this.shadowColor;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
            context.shadowBlur = this.shadowBlur;
        } else {
            context.shadowColor = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
        }
    }

    getTextMetrics(context, text) {
        this.syncFont(context).syncStyle(context);
        return context.measureText(text);
    }

}

export default TextStyle;