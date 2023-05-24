import DefaultPropertyMap from './PropertyMap.js';
import MeasureText from './MeasureText.js';
import CONST from '../const.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class TextStyle {
    constructor(text, style, propertyMap) {
        this.parent = text;
        // parent.updateText()
        // parent.width, parent.height

        if (propertyMap === undefined) {
            propertyMap = DefaultPropertyMap;
        }
        this.propertyMap = propertyMap;

        this.backgroundColor;
        this.backgroundColor2;
        this.backgroundHorizontalGradient;
        this.backgroundStrokeColor;
        this.backgroundStrokeLineWidth;
        this.backgroundCornerRadius;
        this.backgroundCornerIteration;

        this.fontFamily;
        this.fontSize;
        this.fontStyle;
        this.color;
        this.stroke;
        this.strokeThickness;
        this.shadowOffsetX;
        this.shadowOffsetY;
        this.shadowColor;
        this.shadowBlur;
        this.shadowStroke;
        this.shadowFill;

        this.underlineColor;
        this.underlineThickness;
        this.underlineOffset;

        this.halign;
        this.valign;

        this.maxLines;
        this.fixedWidth;
        this.fixedHeight;
        this.resolution;
        this.lineSpacing;
        this.xOffset;

        this.rtl;
        this.testString;

        this.baselineX;
        this.baselineY;

        this.wrapMode;
        this.wrapWidth;
        this.wrapCallback;
        this.wrapCallbackScope;

        this._font;

        //  Set to defaults + user style
        this.setStyle(style, false, true);
    }

    get isWrapFitMode() {
        return (this.fixedWidth > 0) && (this.wrapMode !== CONST.NO_WRAP) && (this.wrapWidth === 0);
    }

    setStyle(style, updateText, setDefaults) {
        if (updateText === undefined) {
            updateText = true;
        }
        if (setDefaults === undefined) {
            setDefaults = false;
        }

        if (style && style.hasOwnProperty('wrap')) {
            var wrap = style.wrap;
            if (wrap.hasOwnProperty('mode')) {
                var mode = wrap.mode;
                if (typeof mode === 'string') {
                    wrap.mode = WRAPMODE[mode];
                }
            } else {
                if (wrap.hasOwnProperty('width')) {
                    wrap.mode = 1;
                }
            }
        }

        // default halign of RTL is 'right'
        if (style && style.rtl && setDefaults && (!style.hasOwnProperty('halign'))) {
            style.halign = 'right';
        }

        //  Avoid type mutation
        if (style && style.hasOwnProperty('fontSize') && typeof style.fontSize === 'number') {
            style.fontSize = style.fontSize.toString() + 'px';
        }

        var propertyMap = this.propertyMap;
        for (var key in propertyMap) {
            var prop = propertyMap[key];  // [ Object Key, Default Value, preCallback ]
            var objKey = prop[0];
            var defaultValue = (setDefaults) ? prop[1] : this[key];
            var postCallback = prop[2];


            if (key === 'wrapCallback' || key === 'wrapCallbackScope') {
                // Callback & scope should be set without processing the values
                this[key] = GetValue(style, objKey, defaultValue);
            } else {
                var value = GetAdvancedValue(style, objKey, defaultValue);
                if (postCallback) {
                    value = postCallback(value);
                }
                this[key] = value;
            }

        }

        //  Allow for 'font' override
        var font = GetValue(style, 'font', null);

        if (font === null) {
            this._font = this.fontStyle + ' ' + this.fontSize + ' ' + this.fontFamily;
        } else {
            this._font = font;
        }

        //  Allow for 'fill' to be used in place of 'color'
        var fill = GetValue(style, 'fill', null);

        if (fill !== null) {
            this.color = GetStyle(fill);
        }

        var metrics = GetValue(style, 'metrics', false);

        //  Provide optional TextMetrics in the style object to avoid the canvas look-up / scanning
        //  Doing this is reset if you then change the font of this TextStyle after creation
        if (metrics) {
            this.metrics = {
                ascent: GetValue(metrics, 'ascent', 0),
                descent: GetValue(metrics, 'descent', 0),
                fontSize: GetValue(metrics, 'fontSize', 0)
            };
        } else if (updateText || (!this.metrics)) {
            this.metrics = MeasureText(this);
        }

        if (updateText) {
            return this.parent.updateText();
        } else {
            return this.parent;
        }
    }

    syncFont(canvas, context) {
        context.font = this._font;
    }

    syncStyle(canvas, context) {
        context.textBaseline = 'alphabetic';

        context.fillStyle = this.color;
        context.strokeStyle = this.stroke;

        context.lineWidth = this.strokeThickness;
        context.lineCap = 'round';
        context.lineJoin = 'round';
    }

    syncShadow(context, enabled) {
        if (enabled) {
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
        } else {
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = 0;
            context.shadowBlur = 0;
        }
    }

    update(recalculateMetrics) {
        if (recalculateMetrics) {
            this._font = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`.trim();

            this.metrics = MeasureText(this);
        }

        return this.parent.updateText(recalculateMetrics);
    }

    buildFont() {
        var newFont = `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`.trim();
        if (newFont !== this._font) {
            this._font = newFont;
            //this.metrics = MeasureText(this);
        }
        return this;
    }

    setFont(font) {
        if (typeof font === 'string') {
            this.fontFamily = font;
            this.fontSize = '';
            this.fontStyle = '';
        } else {
            this.fontFamily = GetValue(font, 'fontFamily', 'Courier');
            this.fontSize = GetValue(font, 'fontSize', '16px');
            this.fontStyle = GetValue(font, 'fontStyle', '');
        }

        return this.update(true);
    }

    setFontFamily(family) {
        this.fontFamily = family;

        return this.update(true);
    }

    setFontStyle(style) {
        this.fontStyle = style;

        return this.update(true);
    }

    setFontSize(size) {
        if (typeof size === 'number') {
            size = size.toString() + 'px';
        }

        this.fontSize = size;

        return this.update(true);
    }

    setTestString(string) {
        this.testString = string;

        return this.update(true);
    }

    setFixedSize(width, height) {
        this.fixedWidth = width;
        this.fixedHeight = height;

        if (width) {
            this.parent.width = width;
        }

        if (height) {
            this.parent.height = height;
        }

        return this.update(this.isWrapFitMode);
    }

    setResolution(value) {
        this.resolution = value;

        return this.update(false);
    }

    setLineSpacing(value) {
        this.lineSpacing = value;

        return this.update(false);
    }

    setXOffset(value) {
        this.xOffset = value;

        return this.update(false);
    }

    setBackgroundColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.backgroundColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundColor2 = GetStyle(color2, this.parent.canvas, this.parent.context);
        this.backgroundHorizontalGradient = isHorizontalGradient;

        return this.update(false);
    }

    setBackgroundStrokeColor(color, lineWidth) {
        this.backgroundStrokeColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.backgroundStrokeLineWidth = lineWidth;

        return this.update(false);
    }

    setBackgroundCornerRadius(radius, iteration) {
        this.backgroundCornerRadius = radius;
        this.backgroundCornerIteration = iteration;

        return this.update(false);
    }

    setFill(color) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setColor(color) {
        this.color = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setStroke(color, thickness) {
        if (color === undefined) {
            //  Reset the stroke to zero (disabling it)
            this.strokeThickness = 0;
        } else {
            if (thickness === undefined) {
                thickness = this.strokeThickness;
            }

            this.stroke = GetStyle(color, this.parent.canvas, this.parent.context);
            this.strokeThickness = thickness;
        }

        return this.update(true);
    }

    setShadow(x, y, color, blur, shadowStroke, shadowFill) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (color === undefined) {
            color = '#000';
        }
        if (blur === undefined) {
            blur = 0;
        }
        if (shadowStroke === undefined) {
            shadowStroke = false;
        }
        if (shadowFill === undefined) {
            shadowFill = true;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;
        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.shadowBlur = blur;
        this.shadowStroke = shadowStroke;
        this.shadowFill = shadowFill;

        return this.update(false);
    }

    setShadowOffset(x, y) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = x;
        }

        this.shadowOffsetX = x;
        this.shadowOffsetY = y;

        return this.update(false);
    }

    setShadowColor(color) {
        if (color === undefined) {
            color = '#000';
        }

        this.shadowColor = GetStyle(color, this.parent.canvas, this.parent.context);

        return this.update(false);
    }

    setShadowBlur(blur) {
        if (blur === undefined) {
            blur = 0;
        }

        this.shadowBlur = blur;

        return this.update(false);
    }

    setShadowStroke(enabled) {
        this.shadowStroke = enabled;

        return this.update(false);
    }

    setShadowFill(enabled) {
        this.shadowFill = enabled;

        return this.update(false);
    }

    setUnderline(color, thickness, offset) {
        if (color === undefined) {
            color = '#000';
        }
        if (thickness === undefined) {
            thickness = 0;
        }
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        this.underlineThickness = thickness;
        this.underlineOffset = offset;

        return this.update(false);
    }

    setUnderlineColor(color) {
        if (color === undefined) {
            color = '#000';
        }

        this.underlineColor = GetStyle(color, this.parent.canvas, this.parent.context);
        return this.update(false);
    }

    setUnderlineThickness(thickness) {
        if (thickness === undefined) {
            thickness = 0;
        }

        this.underlineThickness = thickness;
        return this.update(false);
    }

    setUnderlineOffset(offset) {
        if (offset === undefined) {
            offset = 0;
        }

        this.underlineOffset = offset;
        return this.update(false);
    }

    setWrapMode(mode) {
        if (typeof mode === 'string') {
            mode = WRAPMODE[mode.toLowerCase()] || 0;
        }
        this.wrapMode = mode;
        return this.update(true);
    }

    setWrapWidth(width) {
        this.wrapWidth = width;
        return this.update(false);
    }

    setAlign(halign, valign) {
        if (halign === undefined) {
            halign = 'left';
        }
        if (valign === undefined) {
            valign = 'top';
        }
        this.halign = halign;
        this.valign = valign;

        return this.update(false);
    }

    setHAlign(halign) {
        if (halign === undefined) {
            halign = 'left';
        }
        this.halign = halign;

        return this.update(false);
    }

    setVAlign(valign) {
        if (valign === undefined) {
            valign = 'top';
        }
        this.valign = valign;

        return this.update(false);
    }

    setMaxLines(max) {
        if (max === undefined) {
            max = 0;
        }

        this.maxLines = max;

        return this.update(false);
    }

    getTextMetrics() {
        var metrics = this.metrics;

        return {
            ascent: metrics.ascent,
            descent: metrics.descent,
            fontSize: metrics.fontSize
        };
    }

    setTextMetrics(metrics, font) {
        this.metrics.ascent = metrics.ascent;
        this.metrics.descent = metrics.descent;
        this.metrics.fontSize = metrics.fontSize;

        if (font) {
            if (typeof font === 'string') {
                this.fontFamily = font;
                this.fontSize = '';
                this.fontStyle = '';
            } else {
                this.fontFamily = GetValue(font, 'fontFamily', this.fontFamily);
                this.fontSize = GetValue(font, 'fontSize', this.fontSize);
                this.fontStyle = GetValue(font, 'fontStyle', this.fontStyle);
            }
        }

        return this.parent.updateText(true);
    }

    get lineHeight() {
        return this.metrics.fontSize + this.strokeThickness + this.lineSpacing;
    }

    toJSON() {
        var output = {};

        var propertyMap = this.propertyMap;
        for (var key in propertyMap) {
            output[key] = this[key];
        }

        output.metrics = this.getTextMetrics();

        return output;
    }

    destroy() {
        this.parent = undefined;
    }

}

const WRAPMODE = {
    none: CONST.NO_WRAP,
    word: CONST.WORD_WRAP,
    char: CONST.CHAR_WRAP,
    character: CONST.CHAR_WRAP
};

export default TextStyle;