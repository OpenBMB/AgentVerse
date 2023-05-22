import BaseShapes from '../shapes/BaseShapes.js';
import ProgressBase from '../../../utils/progressbase/ProgressBase.js';
import { Lines } from '../shapes/geoms';
import UpdateShapes from './UpdateShapes.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class LineProgress extends ProgressBase(BaseShapes) {
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

        super(scene, x, y, width, height, config);
        this.type = 'rexLineProgress';

        this.bootProgressBase(config);

        this
            .addShape((new Lines()).setName('trackFill'))
            .addShape((new Lines()).setName('bar'))
            .addShape((new Lines()).setName('trackStroke'))

        this.setTrackColor(GetValue(config, 'trackColor', undefined));
        this.setBarColor(barColor);
        this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

        this.setSkewX(GetValue(config, 'skewX', 0));

        this.setRTL(GetValue(config, 'rtl', false));

        this.setValue(value);
    }

    get trackColor() {
        return this._trackColor;
    }

    set trackColor(value) {
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
        this.dirty = this.dirty || (this._barColor != value);
        this._barColor = value;
    }

    setBarColor(color) {
        this.barColor = color;
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

}

var Methods = {
    updateShapes: UpdateShapes,
}

Object.assign(
    LineProgress.prototype,
    Methods,
)

export default LineProgress;