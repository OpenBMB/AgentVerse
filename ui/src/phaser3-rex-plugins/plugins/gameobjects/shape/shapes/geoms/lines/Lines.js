import PathBase from './PathBase.js';
import PathDataBuilder from '../../../../../geom/pathdata/PathDataBuilder/PathDataBuilder.js';

class Lines extends PathBase {
    constructor() {
        super();
        this.builder = new PathDataBuilder(this.pathData);
    }

    get iterations() {
        return this.builder.iterations;
    }

    set iterations(value) {
        this.dirty = this.dirty || (this.builder.iterations !== value);
        this.builder.setIterations(value);
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    get lastPointX() {
        return this.builder.lastPointX;
    }

    get lastPointY() {
        return this.builder.lastPointY;
    }

    start() {
        this.builder.start();

        this.dirty = true;
        return this;
    }

    startAt(x, y) {
        this.builder.startAt(x, y);

        this.dirty = true;
        return this;
    }

    lineTo(x, y, relative) {
        this.builder.lineTo(x, y, relative);

        this.dirty = true;
        return this;
    }

    verticalLineTo(x, relative) {
        this.builder.verticalLineTo(x, relative);

        this.dirty = true;
        return this;
    }

    horizontalLineTo(y, relative) {
        this.builder.horizontalLineTo(y, relative);

        this.dirty = true;
        return this;
    }

    ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);

        this.dirty = true;
        return this;
    }

    arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

        this.dirty = true;
        return this;
    }

    quadraticBezierTo(cx, cy, x, y) {
        this.builder.quadraticBezierTo(cx, cy, x, y);

        this.dirty = true;
        return this;
    }

    smoothQuadraticBezierTo(x, y) {
        this.builder.smoothQuadraticBezierTo(x, y);

        this.dirty = true;
        return this;
    }

    cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        this.builder.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);

        this.dirty = true;
        return this;
    }

    smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        this.builder.smoothCubicBezierCurveTo(cx1, cy1, x, y);

        this.dirty = true;
        return this;
    }

    close() {
        this.builder.close();

        this.closePath = this.builder.closePath;
        this.dirty = true;
        return this;
    }

    end() {
        this.builder.end();
        this.dirty = true;
        return this;
    }

    rotateAround(centerX, centerY, angle) {
        this.builder.rotateAround(centerX, centerY, angle);

        this.dirty = true;
        return this;
    }

    scale(centerX, centerY, scaleX, scaleY) {
        this.builder.scale(centerX, centerY, scaleX, scaleY);

        this.dirty = true;
        return this;
    }

    offset(x, y) {
        this.builder.offset(x, y);

        this.dirty = true;
        return this;
    }

    toPolygon(polygon) {
        return this.builder.toPolygon(polygon);
    }

    appendPathFrom(src, startT, endT) {
        this.builder.appendFromPathSegment(src.builder, startT, endT);
        return this;
    }

    copyPathFrom(src, startT, endT) {
        this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
        return this;
    }

    setDisplayPathSegment(startT, endT) {
        this.builder.setDisplayPathSegment(startT, endT);
        return this;
    }
}

export default Lines;