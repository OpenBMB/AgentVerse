import Canvas from '../canvasbase/Canvas.js';
import ProgressBase from '../../../utils/progressbase/ProgressBase.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';
import DrawContent from './DrawContent.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class LineProgress extends ProgressBase(Canvas) {
    constructor(scene, x, y, width, height, barColor, value, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        } else if (IsPlainObject(barColor)) {
            config = barColor;
            barColor = GetValue(config, 'barColor', undefined);
            value = GetValue(config, 'value', 0);
        }
        super(scene, x, y, width, height);
        this.type = 'rexLineProgressCanvas';
        this.trackPoints = [];
        this.barPoints = [];

        this.bootProgressBase(config);

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(
            barColor,
            GetValue(config, 'barColor2', undefined),
            GetValue(config, 'isHorizontalGradient', undefined)
        );
        this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

        this.setSkewX(GetValue(config, 'skewX', 0));

        this.setRTL(GetValue(config, 'rtl', false));

        this.setValue(value);
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._trackColor != value);
        this._trackColor = value;
    }

    setTrackColor(color) {
        this.trackColor = color;
        return this;
    }

    get trackStrokeColor() {
        return this._trackStrokeColor;
    }

    set trackStrokeColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._trackStrokeColor != value);
        this._trackStrokeColor = value;
    }

    get trackStrokeThickness() {
        return this._trackStrokeThickness;
    }

    set trackStrokeThickness(value) {
        this.dirty = this.dirty || (this._trackStrokeThickness != value);
        this._trackStrokeThickness = value;
    }

    setTrackStroke(lineWidth, color) {
        this.trackStrokeThickness = lineWidth;
        this.trackStrokeColor = color;
        return this;
    }

    get barColor() {
        return this._barColor;
    }

    set barColor(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._barColor != value);
        this._barColor = value;
    }

    get barColor2() {
        return this._barColor2;
    }

    set barColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty = this.dirty || (this._barColor2 != value);
        this._barColor2 = value;
    }

    get isHorizontalGradient() {
        return this._isHorizontalGradient;
    }

    set isHorizontalGradient(value) {
        this.dirty |= (this._isHorizontalGradient != value);
        this._isHorizontalGradient = value;
    }

    setBarColor(color, color2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }

        this.barColor = color;
        this.barColor2 = color2;
        this.isHorizontalGradient = isHorizontalGradient;
        return this;
    }

    get skewX() {
        return this._skewX;
    }

    set skewX(value) {
        this.dirty = this.dirty || (this._skewX != value);
        this._skewX = value;
    }

    setSkewX(value) {
        this.skewX = value;
        return this;
    }

    get rtl() {
        return this._rtl;
    }

    set rtl(value) {
        value = !!value;
        this.dirty = this.dirty || (this._rtl != value);
        this._rtl = value;
    }

    setRTL(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.rtl = enable;
        return this;
    }

    updateTexture() {
        this.clear();
        DrawContent.call(this);
        super.updateTexture();
        return this;
    }
}

export default LineProgress;