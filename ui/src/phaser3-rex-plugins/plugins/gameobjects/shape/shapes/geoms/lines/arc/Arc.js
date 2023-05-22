import PathBase from '../PathBase.js';
import ArcTo from '../../../../../../geom/pathdata/ArcTo.js';
import FillStyleCanvas from '../../../../utils/render/FillStyleCanvas.js';
import LineStyleCanvas from '../../../../utils/render/LineStyleCanvas.js';
const DegToRad = Phaser.Math.DegToRad;

class Arc extends PathBase {
    constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (radiusX === undefined) { radiusX = 0; }
        if (radiusY === undefined) { radiusY = 0; }
        if (startAngle === undefined) { startAngle = 0; }
        if (endAngle === undefined) { endAngle = 360; }
        if (anticlockwise === undefined) { anticlockwise = false; }
        if (pie === undefined) { pie = false; }

        super();

        this.setCenterPosition(x, y);
        this.setRadius(radiusX, radiusY);
        this.setAngle(startAngle, endAngle, anticlockwise);
        this.setPie(pie);
        this.setIterations(32);
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

    setCenterPosition(x, y) {
        if (y === undefined) {
            y = x;
        }
        this.x = x;
        this.y = y;
        return this;
    }

    get radiusX() {
        return this._radiusX;
    }

    set radiusX(value) {
        this.dirty = this.dirty || (this._radiusX !== value);
        this._radiusX = value;
    }

    get radiusY() {
        return this._radiusY;
    }

    set radiusY(value) {
        this.dirty = this.dirty || (this._radiusY !== value);
        this._radiusY = value;
    }

    setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
            radiusY = radiusX;
        }
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(value) {
        this.dirty = this.dirty || (this._startAngle !== value);
        this._startAngle = value;
    }

    get endAngle() {
        return this._endAngle;
    }

    set endAngle(value) {
        this.dirty = this.dirty || (this._endAngle !== value);
        this._endAngle = value;
    }

    get anticlockwise() {
        return this._anticlockwise;
    }

    set anticlockwise(value) {
        this.dirty = this.dirty || (this._anticlockwise !== value);
        this._anticlockwise = value;
    }

    setAngle(startAngle, endAngle, anticlockwise) {
        // startAngle, endAngle in degrees
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
    }

    get pie() {
        return this._pie;
    }

    set pie(value) {
        this.dirty = this.dirty || (this._pie !== value);
        this._pie = value;
    }

    setPie(pie) {
        if (pie === undefined) {
            pie = true;
        }
        this.pie = pie;
        return this;
    }

    get iterations() {
        return this._iterations;
    }

    set iterations(value) {
        this.dirty = this.dirty || (this._iterations !== value);
        this._iterations = value;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        if (this.pie) {
            this.pathData.push(this.x, this.y);
        }
        ArcTo(
            this.x, this.y,
            this.radiusX, this.radiusY,
            this.startAngle, this.endAngle, this.anticlockwise,
            this.iterations,
            this.pathData
        );
        if (this.pie) {
            this.pathData.push(this.x, this.y);
        }
        this.pathData.push(this.pathData[0], this.pathData[1]);

        super.updateData();
        return this;
    }

    canvasRender(ctx, dx, dy) {
        ctx.beginPath();
        var x = this.x - dx,
            y = this.y - dy,
            startAngle = DegToRad(this.startAngle),
            endAngle = DegToRad(this.endAngle);
        if (this.pie) {
            ctx.moveTo(x, y);
            ctx.lineTo(
                x + Math.cos(startAngle) * this.radiusX,
                y + Math.sin(startAngle) * this.radiusY
            );
        }
        ctx.ellipse(
            x, y,
            this.radiusX, this.radiusY,
            0,
            startAngle, endAngle, this.anticlockwise
        );
        if (this.pie) {
            ctx.lineTo(x, y);
        }
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

export default Arc;