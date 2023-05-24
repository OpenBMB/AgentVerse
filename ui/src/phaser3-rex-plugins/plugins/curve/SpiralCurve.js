const Base = Phaser.Curves.Curve;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const Vector2 = Phaser.Math.Vector2;
const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;
const Linear = Phaser.Math.Linear;

class SpiralCurve extends Base {
    constructor(x, y, startRadius, endRadius, startAngle, endAngle, rotation) {
        var startX, endX, easeX;
        var startY, endY, easeY;
        var startXRadius, endXRadius, easeXRadius;
        var startYRadius, endYRadius, easeYRadius;
        var easeAngle;

        if (typeof(x) === 'object') {
            var config = x;
            if (config.hasOwnProperty('x')) {
                startX = config.x;
                endX = startX;
            } else {
                startX = GetValue(config, 'startX', 0);
                endX = GetValue(config, 'endX', startX);
            }
            easeX = GetValue(config, 'easeX', 'Linear');

            if (config.hasOwnProperty('y')) {
                startY = config.y;
                endY = startY;
            } else {
                startY = GetValue(config, 'startY', 0);
                endY = GetValue(config, 'endY', startY);
            }
            easeY = GetValue(config, 'easeY', 'Linear');

            if (config.hasOwnProperty('startRadius')) {
                startXRadius = config.startRadius;
                startYRadius = startXRadius;
                endXRadius = GetValue(config, 'endRadius', startXRadius);
                endYRadius = endXRadius;
            } else {
                if (config.hasOwnProperty('xRadius')) {
                    startXRadius = config.xRadius;
                    endXRadius = startXRadius;
                } else {
                    startXRadius = GetValue(config, 'startXRadius', 0);
                    endXRadius = GetValue(config, 'endXRadius', startXRadius);
                }
                if (config.hasOwnProperty('yRadius')) {
                    startYRadius = config.yRadius;
                    endYRadius = startYRadius;
                } else {
                    startYRadius = GetValue(config, 'startYRadius', startXRadius);
                    endYRadius = GetValue(config, 'endYRadius', endXRadius);
                }
            }
            easeXRadius = GetValue(config, 'easeXRadius', 'Linear');
            easeYRadius = GetValue(config, 'easeXRadius', easeXRadius);

            startAngle = GetValue(config, 'startAngle', 0);
            endAngle = GetValue(config, 'endAngle', 360);
            easeAngle = GetValue(config, 'easeAngle', 'Linear');
            rotation = GetValue(config, 'rotation', 0);

        } else {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (startRadius === undefined) { startRadius = 0; }
            if (endRadius === undefined) { endRadius = 0; }
            if (startAngle === undefined) { startAngle = 0; }
            if (endAngle === undefined) { endAngle = 360; }
            if (rotation === undefined) { rotation = 0; }

            startX = x;
            endX = x;
            easeX = 'Linear';
            startY = y;
            endY = y;
            easeY = 'Linear';
            startXRadius = startRadius;
            endXRadius = endRadius;
            easeXRadius = 'Linear';
            startYRadius = startRadius;
            endYRadius = endRadius;
            easeYRadius = 'Linear';
            easeAngle = 'Linear';
        }

        super('SpiralCurve');

        this.p0 = new Vector2(startX, startY);
        this.p1 = new Vector2(endX, endY);        
        this._easeX = easeX;
        this._easeXFunction = GetEaseFunction(easeX);
        this._easeY = easeY;
        this._easeYFunction = GetEaseFunction(easeY);

        this._startXRadius = startXRadius;
        this._endXRadius = endXRadius;
        this._easeXRadius = easeXRadius;
        this._easeXRadiusFunction = GetEaseFunction(easeXRadius);
        this._startYRadius = startYRadius;
        this._endYRadius = endYRadius;
        this._easeYRadius = easeYRadius;
        this._easeYRadiusFunction = GetEaseFunction(easeYRadius);
        this._startAngle = DegToRad(startAngle);
        this._endAngle = DegToRad(endAngle);
        this._easeAngle = easeAngle;
        this._easeAngleFunction = GetEaseFunction(easeAngle);
        this._rotation = DegToRad(rotation);
    }

    getResolution(divisions) {
        return divisions * 2;
    }

    getStartPoint(out) {
        return this.getPoint(0, out);
    }

    getPoint(t, out) {
        if (out === undefined) {
            out = new Vector2();
        }

        var ox = Linear(this.p0.x, this.p1.x, this._easeXFunction(t));
        var oy = Linear(this.p0.y, this.p1.y, this._easeYFunction(t));
        var angle = Linear(this._startAngle, this._endAngle, this._easeAngleFunction(t));
        var xRadius = Linear(this._startXRadius, this._endXRadius, this._easeXRadiusFunction(t));
        var yRadius = Linear(this._startYRadius, this._endYRadius, this._easeYRadiusFunction(t));
        var x = ox + xRadius * Math.cos(angle);
        var y = oy + yRadius * Math.sin(angle);

        if (this._rotation !== 0) {
            var cos = Math.cos(this._rotation);
            var sin = Math.sin(this._rotation);

            var tx = x - ox;
            var ty = y - oy;

            // Rotate the point about the center of the ellipse.
            x = tx * cos - ty * sin + ox;
            y = tx * sin + ty * cos + oy;
        }

        return out.set(x, y);
    }

    get x() {
        return this.p0.x;
    }

    set x(value) {
        var dx = value - this.p0.x;
        this.p0.x += dx;
        this.p1.x += dx;
    }

    get y() {
        return this.p0.y;
    }

    set y(value) {
        var dy = value - this.p0.y;
        this.p0.y += dy;
        this.p1.y += dy;
    }

    setStartX(value) {
        this.startX = value;
        return this;
    }

    get startX() {
        return this.p0.x;
    }

    set startX(value) {
        this.p0.x = value;
    }

    setEndX(value) {
        this.endX = value;
        return this;
    }

    get endX() {
        return this.p1.x;
    }

    set endX(value) {
        this.p1.x = value;
    }

    setEaseX(value) {
        this.easeX = value;
        return this;
    }

    get easeX() {
        return this._easeX;
    }

    set easeX(value) {
        this._easeX = value;
        this._easeXFunction = GetEaseFunction(value);
    }

    get y() {
        return this.p0.y;
    }

    set y(value) {
        var dy = value - this.p0.y;
        this.p0.y += dy;
        this.p1.y += dy;
    }

    setStartY(value) {
        this.startY = value;
        return this;
    }

    get startY() {
        return this.p0.y;
    }

    set startY(value) {
        this.p0.y = value;
    }

    setEndY(value) {
        this.endY = value;
        return this;
    }

    get endY() {
        return this.p1.y;
    }

    set endY(value) {
        this.p1.y = value;
    }

    setEaseY(value) {
        this.easeY = value;
        return this;
    }

    get easeY() {
        return this._easeY;
    }

    set easeY(value) {
        this._easeY = value;
        this._easeYFunction = GetEaseFunction(value);
    }

    setXRadius(value) {
        this.xRadius = value;
        return this;
    }

    get xRadius() {
        return Math.max(this._startXRadius, this._endXRadius);
    }

    set xRadius(value) {
        this._startXRadius = value;
        this._endXRadius = value;
    }

    setStartXRadius(value) {
        this.startXRadius = value;
        return this;
    }

    get startXRadius() {
        return this._startXRadius;
    }

    set startXRadius(value) {
        this._startXRadius = value;
    }

    setEndXRadius(value) {
        this.endXRadius = value;
        return this;
    }

    get endXRadius() {
        return this._endXRadius;
    }

    set endXRadius(value) {
        this._endXRadius = value;
    }

    setEaseXRadius(value) {
        this.easeXRadius = value;
        return this;
    }

    get easeXRadius() {
        return this._easeXRadius;
    }

    set easeXRadius(value) {
        this._easeXRadius = value;
        this._easeXRadiusFunction = GetEaseFunction(value);
    }

    setYRadius(value) {
        this.startYRadius = value;
        this.endYRadius = value;
        return this;
    }

    get yRadius() {
        return Math.max(this._startYRadius, this._endYRadius);
    }

    set yRadius(value) {
        this._startYRadius = value;
        this._endYRadius = value;
    }

    setStartYRadius(value) {
        this.startYRadius = value;
        return this;
    }

    get startYRadius() {
        return this._startYRadius;
    }

    set startYRadius(value) {
        this._startYRadius = value;
    }

    setEndYRadius(value) {
        this.endYRadius = value;
        return this;
    }

    get endYRadius() {
        return this._endYRadius;
    }

    set endYRadius(value) {
        this._endYRadius = value;
    }

    setEaseYRadius(value) {
        this.easeYRadius = value;
        return this;
    }

    get easeYRadius() {
        return this._easeYRadius;
    }

    set easeYRadius(value) {
        this._easeYRadius = value;
        this._easeYRadiusFunction = GetEaseFunction(value);
    }

    setWidth(value) {
        var ratio = this.xRadius / value;
        this._startXRadius *= ratio;
        this._endXRadius *= ratio;
        return this;
    }

    setHeight(value) {
        var ratio = this.yRadius / value;
        this._startYRadius *= ratio;
        this._endYRadius *= ratio;
        return this;
    }

    setStartAngle(value) {
        this.startAngle = value;
        return this;
    }

    get startAngle() {
        return RadToDeg(this._startAngle);
    }

    set startAngle(value) {
        this._startAngle = DegToRad(value);
    }

    setEndAngle(value) {
        this.endAngle = value;
        return this;
    }

    get endAngle() {
        return RadToDeg(this._endAngle);
    }

    set endAngle(value) {
        this._endAngle = DegToRad(value);
    }

    setEaseAngle(value) {
        this.easeAngle = value;
        return this;
    }

    get easeAngle() {
        return this._easeAngle;
    }

    set easeAngle(value) {
        this._easeAngle = value;
        this._easeAngleFunction = GetEaseFunction(value);
    }

    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this._rotation);
    }

    set angle(value) {
        this._rotation = DegToRad(value);
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(value) {
        this._rotation = value;
    }

    toJSON() {
        return {
            type: this.type,
            startX: this.p0.x,
            startY: this.p0.y,
            endX: this.p1.x,
            endY: this.p1.y,
            startXRadius: this._startXRadius,
            endXRadius: this._endXRadius,
            easeXRadius: this._easeXRadius,
            startYRadius: this._startYRadius,
            endYRadius: this._endYRadius,
            easeYRadius: this._easeYRadius,
            startAngle: RadToDeg(this._startAngle),
            endAngle: RadToDeg(this._endAngle),
            easeAngle: this._easeAngle,
            rotation: RadToDeg(this._rotation)
        };
    }

    static fromJSON(data) {
        return new SpiralCurve(data);
    }
}

export default SpiralCurve;