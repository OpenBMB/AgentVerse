// https://www.redblobgames.com/grids/hexagons/

import Offset from '../utils/Offset.js';
import SetPoints from './SetPoints.js';

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Line = Phaser.Geom.Line;

class Quad extends Polygon {
    constructor(x, y, width, height, type) {
        super();
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
            type = GetValue(config, 'type', 0);
        }
        var points = this.points;
        for (var i = 0; i < 4; i++) {
            points.push({});
        }
        this.setTo(x, y, width, height, type);
    }

    // override
    setTo(x, y, width, height, type) {
        if (typeof (type) === 'string') {
            type = QUADTYPE[type];
        }
        this.type = type;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        SetPoints(this.centerX, this.centerY, width, height, type, this.points);
        this.calculateArea();
        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        var offsetX = value - this.x;
        if (offsetX === 0) {
            return;
        }
        Offset(this, offsetX, 0);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        var offsetY = value - this.y;
        if (offsetY === 0) {
            return;
        }
        Offset(this, 0, offsetY);
        this._y = value;
    }

    setPosition(x, y) {
        var offsetX = x - this.x;
        var offsetY = y - this.y;
        if ((offsetX === 0) && (offsetY === 0)) {
            return this;
        }
        Offset(this, offsetX, offsetY);
        this._x = x;
        this._y = y;
        return this;
    }

    get left() {
        return this.x - (this.width / 2);
    }

    set left(value) {
        this.x += (value - this.left);
    }

    get right() {
        return this.x + (this.width / 2);
    }

    set right(value) {
        this.x += (value - this.right);
    }

    get top() {
        return this.y - (this.height / 2);
    }

    set top(value) {
        this.y += (value - this.top);
    }

    get bottom() {
        return this.y + (this.height / 2);
    }

    set bottom(value) {
        this.y += (value - this.bottom);
    }

    get centerX() {
        return this.x;
    }

    set centerX(value) {
        this.x += (value - this.centerX);
    }

    get centerY() {
        return this.y;
    }

    set centerY(value) {
        this.y += (value - this.centerY);
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setTo(this._x, this._y, value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setTo(this._x, this._y, this._width, value);
    }

    setSize(width, height) {
        this.setTo(this._x, this._y, width, height);
        return this;
    }

    isEmpty() {
        return (this.width <= 0) || (this.height <= 0);
    }

    getEdge(idx, line) {
        if (line === undefined) {
            line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 4];
        line.setTo(p0.x, p0.y, p1.x, p1.y);
        return line;
    }

    getLineA(line) {
        return this.getEdge(0, line);
    }

    getLineB(line) {
        return this.getEdge(1, line);
    }

    getLineC(line) {
        return this.getEdge(2, line);
    }

    getLineD(line) {
        return this.getEdge(3, line);
    }
}

const QUADTYPE = {
    'rectangle': 0,
    'rhombus': 1
}

// use `rexQuad` to prevent name conflict
Phaser.Geom.rexQuad = Quad;

export default Quad;