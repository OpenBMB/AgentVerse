const GetValue = Phaser.Utils.Objects.GetValue;

class RoundRectangle {
    constructor(x, y, width, height, radiusConfig) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = x; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = 0; }
        if (radiusConfig === undefined) { radiusConfig = 0; }

        this.cornerRadius = {};
        this._width = 0;
        this._height = 0;
        this.setTo(x, y, width, height, radiusConfig);
    }

    setTo(x, y, width, height, radiusConfig) {
        this.setPosition(x, y);
        this.setRadius(radiusConfig);
        this.setSize(width, height);
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    get minWidth() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
    }

    get minHeight() {
        var radius = this.cornerRadius;
        return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (value == null) {
            value = 0;
        }
        this._width = Math.max(value, this.minWidth);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (value == null) {
            value = 0;
        }
        this._height = Math.max(value, this.minHeight);
    }

    get radius() {
        var radius = this.cornerRadius;
        return Math.max(
            radius.tl.x, radius.tl.y,
            radius.tr.x, radius.tr.y,
            radius.bl.x, radius.bl.y,
            radius.br.x, radius.br.y
        );
    }

    set radius(value) {
        var defaultRadiusX, defaultRadiusY;
        if (typeof (value) === 'number') {
            defaultRadiusX = value;
            defaultRadiusY = value;
        } else {
            defaultRadiusX = GetValue(value, 'x', 0);
            defaultRadiusY = GetValue(value, 'y', 0);
        }

        var radius = this.cornerRadius;
        radius.tl = GetRadius(GetValue(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
        radius.tr = GetRadius(GetValue(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
        radius.bl = GetRadius(GetValue(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
        radius.br = GetRadius(GetValue(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
    }

    get radiusTL() {
        var radius = this.cornerRadius.tl;
        return Math.max(radius.x, radius.y);
    }

    set radiusTL(value) {
        SetRadius(this.cornerRadius.tl, value);
    }

    get radiusTR() {
        var radius = this.cornerRadius.tr;
        return Math.max(radius.x, radius.y);
    }

    set radiusTR(value) {
        SetRadius(this.cornerRadius.tr, value);
    }

    get radiusBL() {
        var radius = this.cornerRadius.bl;
        return Math.max(radius.x, radius.y);
    }

    set radiusBL(value) {
        SetRadius(this.cornerRadius.bl, value);
    }

    get radiusBR() {
        var radius = this.cornerRadius.br;
        return Math.max(radius.x, radius.y);
    }

    set radiusBR(value) {
        SetRadius(this.cornerRadius.br, value);
    }
}

var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
    if (radius === undefined) {
        radius = {
            x: defaultRadiusX,
            y: defaultRadiusY
        };
    } else if (typeof (radius) === 'number') {
        radius = {
            x: radius,
            y: radius
        };
    }

    SetConvex(radius);
    return radius;

}

var SetRadius = function (radius, value) {
    if (typeof (value) === 'number') {
        radius.x = value;
        radius.y = value;
    } else {
        radius.x = GetValue(value, 'x', 0);
        radius.y = GetValue(value, 'y', 0);
    }

    SetConvex(radius);
}

var SetConvex = function (radius) {
    radius.convex = (radius.x >= 0) || (radius.y >= 0);

    radius.x = Math.abs(radius.x);
    radius.y = Math.abs(radius.y);
}

export default RoundRectangle;