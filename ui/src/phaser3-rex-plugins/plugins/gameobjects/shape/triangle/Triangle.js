import BaseShapes from '../shapes/BaseShapes.js';
import ShapesUpdateMethods from './methods/ShapesUpdateMethods.js';
import EaseDirectionMethods from './methods/EaseDirectionMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg

class Triangle extends BaseShapes {
    constructor(scene, x, y, width, height, fillColor, fillAlpha) {
        var strokeColor, strokeAlpha, strokeWidth, arrowOnly;
        var direction, easeDuration, padding;
        var radius;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;

            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;
            arrowOnly = config.arrowOnly;

            direction = config.direction;
            easeDuration = config.easeDuration;
            padding = config.padding;

            radius = config.radius;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }

        if (arrowOnly === undefined) { arrowOnly = false; }
        if (direction === undefined) { direction = 0; }
        if (easeDuration === undefined) { easeDuration = 0; }
        if (padding === undefined) { padding = 0; }
        if (radius === undefined) { radius = undefined; }

        super(scene, x, y, width, height);
        this.type = 'rexTriangle';

        this.setFillStyle(fillColor, fillAlpha);

        if ((strokeColor !== undefined) && (strokeWidth === undefined)) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        this.setArrowOnly(arrowOnly);

        this.setDirection(direction, easeDuration);

        this.setPadding(padding);

        this.setRadius(radius);

        this.buildShapes();

    }

    get arrowOnly() {
        return this._arrowOnly;
    }

    set arrowOnly(value) {
        this.dirty = this.dirty || (this._arrowOnly != value);
        this._arrowOnly = value;
    }

    setArrowOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.arrowOnly = enable;
        return this;
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        value = ParseDirection(value);
        if (this._direction === value) {
            return;
        }

        if ((this.easeDuration > 0) && (this._direction !== undefined)) {
            this.previousDirection = this._direction;
        } else {
            this.previousDirection = undefined;
        }

        this._direction = value;
        this.verticeAngle = value * 90;
        this.dirty = true;

        if (this.previousDirection !== undefined) {
            this.playEaseDirectionation();
        } else {
            this.stopEaseDirection();
        }
    }

    setDirection(direction, easeDuration) {
        if (easeDuration !== undefined) {
            this.setEaseDuration(easeDuration);
        }

        this.direction = direction;
        return this;
    }

    toggleDirection(easeDuration) {
        this.setDirection((this.direction + 2), easeDuration);
        return this;
    }

    get easeDirectionProgress() {
        return this._easeDirectionProgress;
    }

    set easeDirectionProgress(value) {
        if (this._easeDirectionProgress === value) {
            return;
        }

        this._easeDirectionProgress = value;
        this.dirty = true;
    }

    setPadding(left, top, right, bottom) {
        if (typeof left === 'object') {
            var config = left;

            //  If they specify x and/or y this applies to all
            var x = GetValue(config, 'x', null);

            if (x !== null) {
                left = x;
                right = x;
            }
            else {
                left = GetValue(config, 'left', 0);
                right = GetValue(config, 'right', left);
            }

            var y = GetValue(config, 'y', null);

            if (y !== null) {
                top = y;
                bottom = y;
            }
            else {
                top = GetValue(config, 'top', 0);
                bottom = GetValue(config, 'bottom', top);
            }
        }
        else {
            if (left === undefined) { left = 0; }
            if (top === undefined) { top = left; }
            if (right === undefined) { right = left; }
            if (bottom === undefined) { bottom = top; }
        }

        if (this.padding === undefined) {
            this.padding = {};
        }

        this.dirty = this.dirty ||
            (this.padding.left != left) ||
            (this.padding.top != top) ||
            (this.padding.right != right) ||
            (this.padding.bottom != bottom);

        this.padding.left = left;
        this.padding.top = top;
        this.padding.right = right;
        this.padding.bottom = bottom;

        // Switch to fit mode
        this.setRadius();

        return this;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this.dirty = this.dirty || (this._radius != value);
        this._radius = value;
    }

    setRadius(radius) {
        this.radius = radius;

        // 0: fit mode
        // 1: circle mode
        this.shapeMode = (radius == null) ? 0 : 1;
        return this;
    }

    get verticeRotation() {
        return this._verticeRotation;
    }

    set verticeRotation(value) {
        this.dirty = this.dirty || (this._verticeRotation != value);
        this._verticeRotation = value;
    }

    setVerticeRotation(rotation) {
        this.verticeRotation = rotation;
        return this;
    }

    get verticeAngle() {
        return RadToDeg(this.verticeRotation);
    }

    set verticeAngle(value) {
        this.verticeRotation = DegToRad(value);
    }

    setVerticeAngle(angle) {
        this.verticeAngle = angle;
        return this;
    }

}

const DirectionNameMap = {
    right: 0, down: 1, left: 2, up: 3
}
var ParseDirection = function (direction) {
    if (typeof (direction) === 'string') {
        direction = DirectionNameMap[direction];
    }
    direction = direction % 4;
    return direction;
}

Object.assign(
    Triangle.prototype,
    ShapesUpdateMethods,
    EaseDirectionMethods,
)

export default Triangle;