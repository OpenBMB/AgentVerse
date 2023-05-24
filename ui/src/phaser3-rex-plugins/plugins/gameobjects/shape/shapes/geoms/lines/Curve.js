import PathBase from './PathBase.js';

class Curve extends PathBase {
    constructor(curve) {
        super();
        this.setCurve(curve);
        this.setIterations(32);
    }

    get curve() {
        return this._curve;
    }

    set curve(value) {
        this.dirty = this.dirty || (this._curve !== value);
        this._curve = value;
    }

    setCurve(curve) {
        this.curve = curve;
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
        var points = this.curve.getPoints(this.iterations);
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            this.pathData.push(points[i].x, points[i].y);
        }
        this.pathData.push(points[0].x, points[0].y);

        super.updateData();
        return this;
    }

}

export default Curve;