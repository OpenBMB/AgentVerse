import PathBase from './PathBase.js';

class Line extends PathBase {
    constructor(x0, y0, x1, y1) {
        if (x0 === undefined) { x0 = 0; }
        if (y0 === undefined) { y0 = 0; }
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }

        super();

        this.setP0(x0, y0);
        this.setP1(x1, y1);
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

    updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x0, this.y0);

        super.updateData();
        return this;
    }
}

export default Line;