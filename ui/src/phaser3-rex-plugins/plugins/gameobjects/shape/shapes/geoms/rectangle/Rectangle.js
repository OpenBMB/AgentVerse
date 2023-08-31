import BaseGeom from '../base/BaseGeom.js';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL.js';
import FillStyleCanvas from '../../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../../utils/render/LineStyleCanvas.js';

const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

class Rectangle extends BaseGeom {
    constructor(x, y, width, height) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = width; }

        super();

        this.pathData = [];
        this.closePath = true;

        this.setTopLeftPosition(x, y);
        this.setSize(width, height);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.dirty = this.dirty || (this._x !== value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.dirty = this.dirty || (this._y !== value);
        this._y = value;
    }

    setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.dirty = this.dirty || (this._width !== value);
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.dirty = this.dirty || (this._height !== value);
        this._height = value;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    get centerX() {
        return this.x + (this.width / 2);
    }

    set centerX(value) {
        this.x = value - (this.width / 2);
    }

    get centerY() {
        return this.y + (this.height / 2);
    }

    set centerY(value) {
        this.y = value - (this.height / 2);
    }

    setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        var x0 = this.x,
            x1 = x0 + this.width,
            y0 = this.y,
            y1 = y0 + this.height;
        this.pathData.push(x0, y0);
        this.pathData.push(x1, y0);
        this.pathData.push(x1, y1);
        this.pathData.push(x0, y1);
        this.pathData.push(x0, y0);

        super.updateData();
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            var fillTint = pipeline.fillTint;
            var fillTintColor = GetTint(this.fillColor, this.fillAlpha * alpha);

            fillTint.TL = fillTintColor;
            fillTint.TR = fillTintColor;
            fillTint.BL = fillTintColor;
            fillTint.BR = fillTintColor;

            pipeline.batchFillRect(-dx + this.x, -dy + this.y, this.width, this.height);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fillRect(-dx, -dy, this.width, this.height);
        }

        if (this.isStroked) {
            LineStyleCanvas(ctx, this);
            ctx.beginPath();
            ctx.rect(-dx, -dy, this.width, this.height);
            ctx.stroke();
        }
    }
}

export default Rectangle;