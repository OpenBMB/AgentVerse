import Canvas from '../canvasbase/Canvas.js';
import GetStyle from '../../../utils/canvas/GetStyle.js';
import DrawContent from './DrawContent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle extends Canvas {
    constructor(scene, x, y, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }
        if (radiusConfig === undefined) { radiusConfig = 0; }

        super(scene, x, y, width, height);
        this.type = 'rexRoundRectangleCanvas';

        var radius = GetValue(radiusConfig, 'radius', radiusConfig);
        var iteration = GetValue(radiusConfig, 'iteration', undefined);
        this.setRadius(radius);
        this.setIteration(iteration);
        this.setFillStyle(fillStyle, fillColor2, isHorizontalGradient);
        this.setStrokeStyle(strokeStyle, lineWidth);
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty |= (this._radius != value);
        this._radius = value;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    get iteration() {
        return this._iteration;
    }

    set iteration(value) {
        this.dirty |= (this._iteration != value);
        this._iteration = value;
    }

    setIteration(iteration) {
        this.iteration = iteration;
        return this;
    }

    get fillStyle() {
        return this._fillStyle;
    }

    set fillStyle(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._fillStyle != value);
        this._fillStyle = value;
    }

    get fillColor2() {
        return this._fillColor2;
    }

    set fillColor2(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._fillColor2 != value);
        this._fillColor2 = value;
    }

    get isHorizontalGradient() {
        return this._isHorizontalGradient;
    }

    set isHorizontalGradient(value) {
        this.dirty |= (this._isHorizontalGradient != value);
        this._isHorizontalGradient = value;
    }

    setFillStyle(fillStyle, fillColor2, isHorizontalGradient) {
        if (isHorizontalGradient === undefined) {
            isHorizontalGradient = true;
        }
        this.fillStyle = fillStyle;
        this.fillColor2 = fillColor2;
        this.isHorizontalGradient = isHorizontalGradient;
        return this;
    }

    get strokeStyle() {
        return this._strokeStyle;
    }

    set strokeStyle(value) {
        value = GetStyle(value, this.canvas, this.context);
        this.dirty |= (this._strokeStyle != value);
        this._strokeStyle = value;
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this.dirty |= (this._lineWidth != value);
        this._lineWidth = value;
    }

    setStrokeStyle(strokeStyle, lineWidth) {
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        return this;
    }

    updateTexture() {
        this.clear();
        DrawContent.call(this);
        super.updateTexture();
        return this;
    }
}

export default RoundRectangle;