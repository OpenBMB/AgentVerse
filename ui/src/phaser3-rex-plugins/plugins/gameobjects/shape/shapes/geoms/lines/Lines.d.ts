import PathBase from "./PathBase";

export default class Lines extends PathBase {
    setIterations(iterations: number): this;
    iterations: number;

    firstPointX: number;
    firstPointY: number;
    lastPointX: number;
    lastPointY: number;

    startAt(x: number, y: number): this;

    lineTo(x: number, y: number, relative?: boolean): this;
    verticalLineTo(x: number, relative?: boolean): this;
    horizontalLineTo(y: number, relative?: boolean): this;

    ellipticalArc(
        centerX: number, centerY: number,
        radiusX: number, radiusY: number,
        startAngle: number, endAngle: number,
        anticlockwise?: boolean
    ): this;
    arc(
        centerX: number, centerY: number,
        radius: number,
        startAngle: number, endAngle: number,
        anticlockwise?: boolean
    ): this;

    quadraticBezierTo(
        cx: number, cy: number,
        x: number, y: number
    ): this;
    smoothQuadraticBezierTo(
        x: number, y: number
    ): this;

    cubicBezierCurveTo(
        cx0: number, cy0: number,
        cx1: number, cy1: number,
        x: number, y: number
    ): this;
    smoothCubicBezierCurveTo(
        cx1: number, cy1: number,
        x: number, y: number
    ): this;

    close(): this;

    end(): this;

    rotateAround(
        centerX: number, centerY: number,
        angle: number
    ): this;

    scale(
        centerX: number, centerY: number,
        scaleX: number, scaleY: number
    ): this;

    offset(x: number, y: number): this;

    savePathData(): this;
    restorePathData(): this;

    appendPathFrom(src: Lines): this;
    appendPathFrom(src: Lines, endT: number): this;
    appendPathFrom(src: Lines, startT: number, endT: number): this;

    copyPathFrom(src: Lines): this;
    copyPathFrom(src: Lines, endT: number): this;
    copyPathFrom(src: Lines, startT: number, endT: number): this;

    setDisplayPathSegment(endT: number): this;
    setDisplayPathSegment(startT: number, endT: number): this;
}