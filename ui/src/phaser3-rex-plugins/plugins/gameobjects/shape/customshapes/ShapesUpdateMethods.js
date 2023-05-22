import {
    Arc,
    Circle,
    Curve,
    Ellipse,
    Line,
    Lines,
    Rectangle,
    RoundRectangle,
    Triangle
} from '../shapes/geoms';

const ShapeClasses = {
    arc: Arc,
    circle: Circle,
    curve: Curve,
    ellipse: Ellipse,
    line: Line,
    lines: Lines,
    rectangle: Rectangle,
    roundRectangle: RoundRectangle,
    triangle: Triangle
}

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

const ClearAll = function () {
    var shapes = this.getShapes();
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shapes[i].lineStyle().fillStyle();
    }
};

export default {
    createShape(shapeType, name) {
        var ShapeClass = ShapeClasses[shapeType];
        var shape = new ShapeClass();
        if (name) {
            shape.setName(name);
        }
        return shape;
    },

    buildShapes(config) {
        var createCallback = GetValue(config, 'create', undefined);

        if (IsPlainObject(createCallback)) {
            var shapes = createCallback;
            for (var shapeType in shapes) {
                var name = shapes[shapeType];
                switch (typeof (name)) {
                    case 'number':
                        for (var i = 0; i < name; i++) {
                            this.addShape(this.createShape(shapeType));
                        }
                        break;

                    case 'string':
                        this.addShape(this.createShape(shapeType, name));
                        break;

                    default: //Array
                        var names = name;
                        for (var i = 0, cnt = names.length; i < cnt; i++) {
                            this.addShape(this.createShape(shapeType, names[i]));
                        }
                        break;
                }
            }
        } else if (Array.isArray(createCallback)) {
            var shapes = createCallback;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];
                this.addShape(this.createShape(shape.type, shape.name));
            }

        } else if (typeof (createCallback) === 'function') {
            createCallback.call(this);

        }

        this.setUpdateShapesCallback(GetValue(config, 'update'));
    },

    setUpdateShapesCallback(callback) {
        if (callback === undefined) {
            callback = ClearAll;
        }
        this.dirty = this.dirty || (this.updateCallback !== callback);
        this.updateCallback = callback;
        return this;
    },

    updateShapes() {
        this.updateCallback.call(this);
    }
}