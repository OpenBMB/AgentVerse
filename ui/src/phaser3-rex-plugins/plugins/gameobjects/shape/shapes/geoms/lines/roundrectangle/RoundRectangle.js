import PathBase from '../PathBase.js';
import ArcTo from '../../../../../../geom/pathdata/ArcTo.js';
import LineTo from '../../../../../../geom/pathdata/LineTo.js';
import Offset from '../../../../../../geom/pathdata/Offset.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle extends PathBase {
    constructor(x, y, width, height, radius, iterations) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = width; }
        if (radius === undefined) { radius = 0; }
        if (iterations === undefined) { iterations = 6; }

        super();

        this.setTopLeftPosition(x, y);
        this.setSize(width, height);
        this.setRadius(radius);
        this.setIterations(iterations);
        this.closePath = true;
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

    get radiusTL() {
        return this._radiusTL;
    }

    set radiusTL(value) {
        var isConvex = (value > 0);
        this.dirty = this.dirty || (this._radiusTL !== value) || (this._convexTL !== isConvex);
        this._convexTL = isConvex;
        this._radiusTL = Math.abs(value);

    }

    get radiusTR() {
        return this._radiusTR;
    }

    set radiusTR(value) {
        var isConvex = (value > 0);
        this.dirty = this.dirty || (this._radiusTR !== value) || (this._convexTR !== isConvex);
        this._convexTR = isConvex;
        this._radiusTR = Math.abs(value);
    }

    get radiusBL() {
        return this._radiusBL;
    }

    set radiusBL(value) {
        var isConvex = (value > 0);
        this.dirty = this.dirty || (this._radiusBL !== value) || (this._convexBL !== isConvex);
        this._convexBL = isConvex;
        this._radiusBL = Math.abs(value);
    }

    get radiusBR() {
        return this._radiusBR;
    }

    set radiusBR(value) {
        var isConvex = (value > 0);
        this.dirty = this.dirty || (this._radiusBR !== value) || (this._convexBR !== isConvex);
        this._convexBR = isConvex;
        this._radiusBR = Math.abs(value);
    }

    get radius() {
        return Math.max(this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR,);
    }

    set radius(value) {
        if (typeof (value) === 'number') {
            this.radiusTL = value;
            this.radiusTR = value;
            this.radiusBL = value;
            this.radiusBR = value;
        } else {
            this.radiusTL = GetValue(value, 'tl', 0);
            this.radiusTR = GetValue(value, 'tr', 0);
            this.radiusBL = GetValue(value, 'bl', 0);
            this.radiusBR = GetValue(value, 'br', 0);
        }
    }

    setRadius(radius) {
        if (radius === undefined) {
            radius = 0;
        }
        this.radius = radius;
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
        var pathData = this.pathData;
        pathData.length = 0;

        var width = this.width, height = this.height,
            radius,
            iterations = this.iterations + 1;

        // top-left
        radius = this.radiusTL;
        if (radius > 0) {
            if (this._convexTL) {
                var centerX = radius;
                var centerY = radius;
                ArcTo(centerX, centerY, radius, radius, 180, 270, false, iterations, pathData);
            } else {
                var centerX = 0;
                var centerY = 0;
                ArcTo(centerX, centerY, radius, radius, 90, 0, true, iterations, pathData);
            }
        } else {
            LineTo(0, 0, pathData);
        }

        // top-right
        radius = this.radiusTR;
        if (radius > 0) {
            if (this._convexTR) {
                var centerX = width - radius;
                var centerY = radius;
                ArcTo(centerX, centerY, radius, radius, 270, 360, false, iterations, pathData);
            } else {
                var centerX = width;
                var centerY = 0;
                ArcTo(centerX, centerY, radius, radius, 180, 90, true, iterations, pathData);
            }
        } else {
            LineTo(width, 0, pathData);
        }

        // bottom-right
        radius = this.radiusBR;
        if (radius > 0) {
            if (this._convexBR) {
                var centerX = width - radius;
                var centerY = height - radius;
                ArcTo(centerX, centerY, radius, radius, 0, 90, false, iterations, pathData);
            } else {
                var centerX = width;
                var centerY = height;
                ArcTo(centerX, centerY, radius, radius, 270, 180, true, iterations, pathData);
            }
        } else {
            LineTo(width, height, pathData);
        }

        // bottom-left
        radius = this.radiusBL;
        if (radius > 0) {
            if (this._convexBL) {
                var centerX = radius;
                var centerY = height - radius;
                ArcTo(centerX, centerY, radius, radius, 90, 180, false, iterations, pathData);
            } else {
                var centerX = 0;
                var centerY = height;
                ArcTo(centerX, centerY, radius, radius, 360, 270, true, iterations, pathData);
            }
        } else {
            LineTo(0, height, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        Offset(this.x, this.y, pathData);

        super.updateData();
        return this;
    }
}

export default RoundRectangle;