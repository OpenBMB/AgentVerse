import BaseGeom from '../base/BaseGeom.js';
import StrokePathWebGL from '../../../utils/render/StrokePathWebGL.js';
import FillStyleCanvas from '../../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../../utils/render/LineStyleCanvas.js';

const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

class Triangle extends BaseGeom {
    constructor(x0, y0, x1, y1, x2, y2) {
        if (x0 === undefined) { x0 = 0; }
        if (y0 === undefined) { y0 = 0; }
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        super();

        this.pathData = [];
        this.closePath = true;

        this.setP0(x0, y0);
        this.setP1(x1, y1);
        this.setP2(x2, y2);
    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.dirty = this.dirty || (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.dirty = this.dirty || (this._y0 !== value);
        this._y0 = value;
    }

    setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.dirty = this.dirty || (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.dirty = this.dirty || (this._y1 !== value);
        this._y1 = value;
    }

    setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    get x2() {
        return this._x2;
    }

    set x2(value) {
        this.dirty = this.dirty || (this._x2 !== value);
        this._x2 = value;
    }

    get y2() {
        return this._y2;
    }

    set y2(value) {
        this.dirty = this.dirty || (this._y2 !== value);
        this._y2 = value;
    }

    setP2(x, y) {
        this.dirty = this.dirty || (this.x2 !== x) || (this.y2 !== y);
        this.x2 = x;
        this.y2 = y;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);

        super.updateData();
        return this;
    }

    webglRender(pipeline, calcMatrix, alpha, dx, dy) {
        if (this.isFilled) {
            var fillTintColor = GetTint(this.fillColor, this.fillAlpha * alpha);

            var x0 = this.x0 - dx;
            var y0 = this.y0 - dy;
            var x1 = this.x1 - dx;
            var y1 = this.y1 - dy;
            var x2 = this.x2 - dx;
            var y2 = this.y2 - dy;

            var tx0 = calcMatrix.getX(x0, y0);
            var ty0 = calcMatrix.getY(x0, y0);
            var tx1 = calcMatrix.getX(x1, y1);
            var ty1 = calcMatrix.getY(x1, y1);
            var tx2 = calcMatrix.getX(x2, y2);
            var ty2 = calcMatrix.getY(x2, y2);

            pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, fillTintColor, fillTintColor, fillTintColor);
        }

        if (this.isStroked) {
            StrokePathWebGL(pipeline, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        var x1 = this.x1 - dx;
        var y1 = this.y1 - dy;
        var x2 = this.x2 - dx;
        var y2 = this.y2 - dy;
        var x3 = this.x3 - dx;
        var y3 = this.y3 - dy;

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);

        ctx.closePath();

        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fill();
        }

        if (this.isStroked) {
            LineStyleCanvas(ctx, this);
            ctx.stroke();
        }
    }
}

export default Triangle;