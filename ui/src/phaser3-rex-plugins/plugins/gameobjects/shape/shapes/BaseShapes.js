import Render from './render/Render.js';
import Clear from '../../../utils/object/Clear.js';

const Shape = Phaser.GameObjects.Shape;
const RemoveItem = Phaser.Utils.Array.Remove;

class BaseShapes extends Shape {
    constructor(scene, x, y, width, height) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = 2;
        }
        if (height === undefined) {
            height = width;
        }

        super(scene, 'rexShapes', []);

        this._width = -1;
        this._height = -1;
        this.dirty = true;
        this.isSizeChanged = true;
        this.shapes = {};

        this.setPosition(x, y);
        this.setSize(width, height);

        this.updateDisplayOrigin();
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.setSize(value, this._height);
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.setSize(this._width, value);
    }

    setDirty(value) {
        if (value === undefined) {
            value = true;
        }
        this.dirty = value;
        return this;
    }

    setSize(width, height) {
        this.isSizeChanged = this.isSizeChanged || (this._width !== width) || (this._height !== height);
        this.dirty = this.dirty || this.isSizeChanged;
        this._width = width;
        this._height = height;
        this.updateDisplayOrigin();
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

    get fillColor() {
        return this._fillColor;
    }

    set fillColor(value) {
        this.setFillStyle(value, this._fillAlpha);
    }

    get fillAlpha() {
        return this._fillAlpha;
    }

    set fillAlpha(value) {
        this.setFillStyle(this._fillColor, value);
    }

    setFillStyle(color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.dirty = this.dirty ||
            (this.fillColor !== color) ||
            (this.fillAlpha !== alpha);

        this._fillColor = color;
        this._fillAlpha = alpha;

        return this;
    }

    get lineWidth() {
        return this._lineWidth;
    }

    set lineWidth(value) {
        this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(value) {
        this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
    }

    get strokeAlpha() {
        return this._strokeAlpha;
    }

    set strokeAlpha(value) {
        this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
    }

    setStrokeStyle(lineWidth, color, alpha) {
        if (alpha === undefined) {
            alpha = 1;
        }

        this.dirty = this.dirty ||
            (this.lineWidth !== lineWidth) ||
            (this.strokeColor !== color) ||
            (this.strokeAlpha !== alpha);

        this._lineWidth = lineWidth;
        this._strokeColor = color;
        this._strokeAlpha = alpha;

        return this;
    }

    updateShapes() {

    }

    updateData() {
        if (!this.dirty) {
            return this;
        }

        this.updateShapes();
        var shapes = this.geom;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];
            if (shape.dirty) {
                shape.updateData();
            }
        }

        this.isSizeChanged = false;
        this.dirty = false;


        return this;
    }

    clear() {
        this.geom.length = 0;
        Clear(this.shapes);
        return this;
    }

    getShape(name) {
        return this.shapes[name];
    }

    getShapes() {
        return this.geom;
    }

    addShape(shape) {
        this.geom.push(shape);
        var name = shape.name;
        if (name) {
            this.shapes[name] = shape;
        }
        this.dirty = true;
        return this;
    }

    deleteShape(name) {
        var shape = this.getShape(name);
        if (shape) {
            delete this.shapes[name];
            RemoveItem(this.geom, shape);
        }
        return this;
    }
}

Object.assign(
    BaseShapes.prototype,
    Render
);

export default BaseShapes;