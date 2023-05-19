import DrawShape from './DrawShape.js';

const Graphics = Phaser.GameObjects.Graphics;

class DefaultMaskGraphics extends Graphics {
    constructor(parent, shape, padding) {
        if (shape === undefined) {
            shape = 0;
        }
        if (typeof (shape) === 'string') {
            shape = SHAPEMODE[shape];
        }
        if (padding === undefined) {
            padding = 0;
        }

        super(parent.scene);
        this.parent = parent;
        this.shape = shape;
        this.padding = padding;
        this.setPosition().resize().setVisible(false);
        // Don't add it to display list
    }

    destroy() {
        this.parent = undefined;
        super.destroy();
        return this;
    }

    setPosition(x, y) {
        var parent = this.parent;
        if (x === undefined) {
            x = parent.x;
        }
        if (y === undefined) {
            y = parent.y;
        }
        super.setPosition(x, y);
        return this;
    }

    resize(width, height, padding) {
        var parent = this.parent;
        if (width === undefined) {
            width = parent.width;
        }
        if (height === undefined) {
            height = parent.height;
        }
        if (padding === undefined) {
            padding = this.padding;
        }
        if ((this.width === width) && (this.height === height) && (this.paddingSave === padding)) {
            return this;
        }

        this.width = width;
        this.height = height;
        this.originX = parent.originX;
        this.originY = parent.originY;
        this.paddingSave = padding;

        DrawShape.call(this,
            width, height, padding,
            parent.originX, parent.originY
        );

        return this;
    }

    setOrigin(originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var parent = this.parent;
        if (originX === undefined) {
            originX = parent.originX;
        }
        if (originY === undefined) {
            originY = parent.originY;
        }
        if ((this.originX === originX) && (this.originY === originY)) {
            return this;
        }

        this.originX = originX;
        this.originY = originY;

        DrawShape.call(this,
            this.width, this.height, this.paddingSave,
            originX, originY,
        );
        return this;
    }
}

const SHAPEMODE = {
    rectangle: 0,
    circle: 1,
}
export default DefaultMaskGraphics;
