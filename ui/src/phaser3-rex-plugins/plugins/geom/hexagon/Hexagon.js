// https://www.redblobgames.com/grids/hexagons/

import Offset from '../utils/Offset.js';
import Width from './Width.js';
import Height from './Height.js';
import SetPoints from './SetPoints.js';

const Polygon = Phaser.Geom.Polygon;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Line = Phaser.Geom.Line;

class Hexagon extends Polygon {
    constructor(x, y, size, orientationType) {
        super();
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            size = GetValue(config, 'size', 0);
            orientationType = GetValue(config, 'type', 1);
        }
        var points = this.points;
        for (var i = 0; i < 6; i++) {
            points.push({});
        }
        this.setTo(x, y, size, orientationType);
    }

    // override
    setTo(x, y, size, orientationType) {
        if (typeof (orientationType) === 'string') {
            orientationType = ORIENTATIONTYPE[orientationType]
        }

        this._x = x;
        this._y = y;
        this._size = size;
        this._orientationType = orientationType;

        SetPoints(x, y, size, orientationType, this.points);
        this.calculateArea();
        this.width = Width(this);
        this.height = Height(this);
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

    get centerX() {
        return this.x;
    }

    set centerX(value) {
        this.x = value;
    }

    get centerY() {
        return this.y;
    }

    set centerY(value) {
        this.y = value;
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

    get size() {
        return this._size;
    }

    set size(value) {
        this.setTo(this._x, this._y, value, this._orientationType);
    }

    setSize(value) {
        this.size = value;
        return this;
    }

    get orientationType() {
        return this._orientationType;
    }

    set orientationType(value) {
        this.setTo(this._x, this._y, this._size, value);
    }

    setType(orientationType) {
        this.orientationType = orientationType;
    }

    isEmpty() {
        return (this.size <= 0);
    }

    getEdge(idx, line) {
        if (line === undefined) {
            line = new Line();
        }
        var p0 = this.points[idx];
        var p1 = this.points[(idx + 1) % 6];
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

    getLineE(line) {
        return this.getEdge(4, line);
    }

    getLineF(line) {
        return this.getEdge(5, line);
    }
}

const ORIENTATIONTYPE = {
    'flat': 0,
    'y': 0,
    'pointy': 1,
    'x': 1
};

// use `rexHexagon` to prevent name conflict
Phaser.Geom.rexHexagon = Hexagon;

export default Hexagon;