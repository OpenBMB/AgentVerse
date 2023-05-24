import GeomRoundRectangle from '../../../geom/roundrectangle/RoundRectangle.js';
import LineTo from '../../../geom/pathdata/LineTo.js';
import ArcTo from '../../../geom/pathdata/ArcTo.js';
import Render from './render/Render.js';

const Shape = Phaser.GameObjects.Shape;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Earcut = Phaser.Geom.Polygon.Earcut;

class RoundRectangle extends Shape {
    constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
        var strokeColor, strokeAlpha, strokeWidth, shapeType;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            radiusConfig = config.radius;
            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;

            shapeType = config.shape;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }
        if (radiusConfig === undefined) { radiusConfig = 0; }
        if (shapeType === undefined) { shapeType = 0; }

        var geom = new GeomRoundRectangle();  // Configurate it later
        super(scene, 'rexRoundRectangleShape', geom);

        this.setShapeType(shapeType);

        if (this.shapeType === 0) {
            var radius = GetValue(radiusConfig, 'radius', radiusConfig);
            geom.setTo(0, 0, width, height, radius);
        } else {
            var radius = { x: (width / 2), y: (height / 2) };
            geom.setTo(0, 0, width, height, radius);
        }

        var iteration = GetValue(radiusConfig, 'iteration', undefined);
        this.setIteration(iteration);
        this.setPosition(x, y);

        this.setFillStyle(fillColor, fillAlpha);

        if ((strokeColor !== undefined) && (strokeWidth === undefined)) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        this.updateDisplayOrigin();
        this.dirty = true;
    }

    get fillColor() {
        return this._fillColor;
    }

    set fillColor(value) {
        this._fillColor = value;
        this.isFilled = (value != null) && (this._fillAlpha > 0);
    }

    get fillAlpha() {
        return this._fillAlpha;
    }

    set fillAlpha(value) {
        this._fillAlpha = value;
        this.isFilled = (value > 0) && (this._fillColor != null);
    }

    // Fully override setFillStyle method
    setFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.fillColor = color;
        this.fillAlpha = alpha;

        return this;
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(value) {
        this._strokeColor = value;
        this.isStroked = (value != null) && (this._lineWidth > 0);
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this._lineWidth = value;
        this.isStroked = (value > 0) && (this._strokeColor != null);
    }

    // Fully override setStrokeStyle method
    setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.lineWidth = lineWidth;
        this.strokeColor = color;
        this.strokeAlpha = alpha;

        return this;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;

        pathData.length = 0;

        var width = geom.width, height = geom.height,
            cornerRadius = geom.cornerRadius,
            radius,
            iteration = this.iteration + 1;

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
            } else {
                var centerX = 0;
                var centerY = 0;
                ArcTo(centerX, centerY, radius.x, radius.y, 90, 0, true, iteration, pathData);
            }
        } else {
            LineTo(0, 0, pathData);
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
            } else {
                var centerX = width;
                var centerY = 0;
                ArcTo(centerX, centerY, radius.x, radius.y, 180, 90, true, iteration, pathData);
            }
        } else {
            LineTo(width, 0, pathData);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = height - radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
            } else {
                var centerX = width;
                var centerY = height;
                ArcTo(centerX, centerY, radius.x, radius.y, 270, 180, true, iteration, pathData);
            }
        } else {
            LineTo(width, height, pathData);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = height - radius.y;
                ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
            } else {
                var centerX = 0;
                var centerY = height;
                ArcTo(centerX, centerY, radius.x, radius.y, 360, 270, true, iteration, pathData);
            }
        } else {
            LineTo(0, height, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);
        return this;
    }

    setShapeType(shapeType) {
        if (typeof (shapeType) === 'string') {
            shapeType = ShapeTypeMap[shapeType];
        }

        this.shapeType = shapeType;
        return this;
    }

    get width() {
        return this.geom.width;
    }
    set width(value) {
        this.resize(value, this.height);
    }

    get height() {
        return this.geom.height;
    }
    set height(value) {
        this.resize(this.width, value);
    }

    setSize(width, height) {
        // Override Shape's setSize method
        if (height === undefined) {
            height = width;
        }
        if ((this.geom.width === width) && (this.geom.height === height)) {
            return this;
        }
        this.geom.setSize(width, height);

        if (this.shapeType === 1) {
            this.setRadius({
                x: (width / 2),
                y: (height / 2)
            })
        }

        this.updateDisplayOrigin();
        this.dirty = true;

        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = width;
            input.hitArea.height = height;
        }
        return this;
    }

    resize(width, height) {
        this.setSize(width, height);
        return this;
    }

    get radius() {
        return this.geom.radius;
    }

    set radius(value) {
        this.geom.setRadius(value);
        this.updateDisplayOrigin();
        this.dirty = true;
    }

    get radiusTL() {
        return this.geom.radiusTL;
    }

    set radiusTL(value) {
        this.geom.radiusTL = value;
        this.dirty = true;
    }

    get radiusTR() {
        return this.geom.radiusTR;
    }

    set radiusTR(value) {
        this.geom.radiusTR = value;
        this.dirty = true;
    }

    get radiusBL() {
        return this.geom.radiusBL;
    }

    set radiusBL(value) {
        this.geom.radiusBL = value;
        this.dirty = true;
    }

    get radiusBR() {
        return this.geom.radiusBR;
    }

    set radiusBR(value) {
        this.geom.radiusBR = value;
        this.dirty = true;
    }

    setRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radius = value;
        return this;
    }

    setRadiusTL(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTL = value;
        return this;
    }

    setRadiusTR(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusTR = value;
        return this;
    }

    setRadiusBL(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBL = value;
        return this;
    }

    setRadiusBR(value) {
        if (value === undefined) {
            value = 0;
        }
        this.radiusBR = value;
        return this;
    }

    get cornerRadius() {
        return this.geom.cornerRadius;
    }

    set cornerRadius(value) {
        this.radius = value;
    }

    setCornerRadius(value) {
        return this.setRadius(value);
    }

    get iteration() {
        return this._iteration;
    }

    set iteration(value) {
        // Set iteration first time
        if (this._iteration === undefined) {
            this._iteration = value;
            return;
        }

        // Change iteration value
        if (this._iteration === value) {
            return;
        }

        this._iteration = value;
        this.dirty = true;
    }

    setIteration(iteration) {
        if (iteration === undefined) {
            iteration = 6;
        }
        this.iteration = iteration;
        return this;
    }

}

var IsArcCorner = function (radius) {
    return ((radius.x > 0) && (radius.y > 0));
}

const ShapeTypeMap = {
    rectangle: 0,
    circle: 1
}


Object.assign(
    RoundRectangle.prototype,
    Render
);

export default RoundRectangle;