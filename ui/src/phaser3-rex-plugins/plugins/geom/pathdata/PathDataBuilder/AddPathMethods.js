import StartAt from '../StartAt.js';
import LineTo from '../LineTo.js';
import ArcTo from '../ArcTo.js';
import QuadraticBezierTo from '../QuadraticBezierTo.js';
import CubicBezierCurveTo from '../CubicBezierCurveTo.js';
import DuplicateLast from '../DuplicateLast.js';

export default {
    clear() {
        this.start();
        return this;
    },

    start() {
        this.startAt();
        return this;
    },

    startAt(x, y) {
        this.restorePathData();
        this.accumulationLengths = undefined;

        StartAt(x, y, this.pathData);
        this.firstPointX = x;
        this.firstPointY = y;
        this.lastPointX = x;
        this.lastPointY = y;

        return this;
    },

    lineTo(x, y, relative) {
        if (relative === undefined) {
            relative = false;
        }
        if (relative) {
            x += this.lastPointX;
            y += this.lastPointY;
        }

        LineTo(x, y, this.pathData);

        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    },

    verticalLineTo(x, relative) {
        this.lineTo(x, this.lastPointY, relative);
        return this;
    },

    horizontalLineTo(y, relative) {
        this.lineTo(this.lastPointX, y, relative);
        return this;
    },

    ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        ArcTo(
            centerX, centerY,
            radiusX, radiusY,
            startAngle, endAngle, anticlockwise,
            this.iterations,
            this.pathData
        );

        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        return this;
    },

    arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise)
        return this;
    },

    quadraticBezierTo(cx, cy, x, y) {
        QuadraticBezierTo(
            cx, cy, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx;
        this.lastCY = cy;
        return this;
    },

    smoothQuadraticBezierTo(x, y) {
        var cx = this.lastPointX * 2 - this.lastCX;
        var cy = this.lastPointY * 2 - this.lastCY;
        this.quadraticBezierTo(cx, cy, x, y);
        return this;
    },

    cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        CubicBezierCurveTo(
            cx0, cy0, cx1, cy1, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx1;
        this.lastCY = cy1;
        return this;
    },

    smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        var cx0 = this.lastPointX * 2 - this.lastCX;
        var cy0 = this.lastPointY * 2 - this.lastCY;
        this.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
        return this;
    },

    close() {
        this.closePath = true;
        return this;
    },

    end() {
        DuplicateLast(this.pathData);
        return this;
    },

}