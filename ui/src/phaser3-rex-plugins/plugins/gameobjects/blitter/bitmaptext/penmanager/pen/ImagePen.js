import Base from './Base.js';
import AddImage from '../../../blitterbase/utils/AddImage.js';

class ImagePen extends Base {
    constructor(parent) {
        super(parent);
        this.bobs = {};

        this._x = 0;
        this._y = 0;
        this.leftSpace = 0;
        this.rightSpace = 0;

        this.addImage('main', 0);
    }

    onFree() {
        this.frame = undefined;

        this
            .setLeftSpace(0)
            .setRightSpace(0);

        super.onFree();
    }

    setFrame(frame) {
        this.frame = frame;

        var bobs = this.bobs;
        for (var key in bobs) {
            bobs[key].setFrame(frame);
        }

        return this;
    }

    addImage(key, depth) {
        var bob = AddImage(this.bitmapText, this.frame)
            .setPosition(this.x, this.y)
            .setDepth(depth);

        this.bobs[key] = bob;

        return this;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        var dx = value - this._x;
        this._x = value;

        var bobs = this.bobs;
        for (var key in bobs) {
            bobs[key].x += dx;
        }
    }

    get y() {
        return this._y;
    }

    set y(value) {
        var dy = value - this._y;
        this._y = value;

        var bobs = this.bobs;
        for (var key in bobs) {
            bobs[key].y += dy;
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setLeftSpace(value) {
        this.leftSpace = value;
        return this;
    }

    setRightSpace(value) {
        this.rightSpace = value;
        return this;
    }

    get width() {
        return this.bobs.main.width;
    }

    get outerWidth() {
        return this.width + this.leftSpace + this.rightSpace;
    }

    setShadow(x, y, color, alpha) {
        this.shadowX = x;
        this.shadowY = y;
        this.shadowColor = color;
        this.shadowAlpha = alpha;

        if (!this.bobs.shadow) {
            this.addImage('shadow', -1);
        }

        var bob = this.bobs.shadow;
        if (x === undefined) {
            bob.setActive(false);
        } else {
            bob
                .setActive(true)
                .setPosition(this.x + this.shadowX, this.y + this.shadowY)
                .setAlpha(alpha)
                .setColor(color)
                .setTintEffect(2)
        }

        return this;
    }

}

export default ImagePen;