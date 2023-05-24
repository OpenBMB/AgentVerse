import Base from './Base.js';

const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const GetValue = Phaser.Utils.Objects.GetValue;

class RenderBase extends Base {

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.setDisplayListDirty(this._visible != value);
        this._visible = value;
    }

    setVisible(visible) {
        if (visible === undefined) {
            visible = true;
        }

        this.visible = visible;
        return this;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this.setDisplayListDirty(!!this._alpha !== !!value);
        this._alpha = value;
    }

    setAlpha(alpha) {
        this.alpha = alpha;
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setRotation(rotation) {
        this.rotation = rotation;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(angle) {
        this.angle = angle;
        return this;
    }

    setScaleX(scaleX) {
        this.scaleX = scaleX;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    setWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.width = width;

        if (keepAspectRatio) {
            this.scaleY = this.scaleX;
        }
        return this;
    }

    setScaleY(scaleY) {
        this.scaleY = scaleY;
        return this;
    }

    setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.height = height;

        if (keepAspectRatio) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setScale(scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    get displayWidth() {
        return this._width * this.scaleX;
    }

    set displayWidth(value) {
        this.scaleX = value / this._width;
    }

    setDisplayWidth(width, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }

        this.displayWidth = width;

        if (keepAspectRatio) {
            this.scaleY = this.scaleX;
        }
        return this;
    }

    get displayHeight() {
        return this._height * this.scaleY;
    }

    set displayHeight(value) {
        this.scaleY = value / this._height;
    }

    setDisplayHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }

        this.displayHeight = height;

        if (keepAspectRatio) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setOriginX(originX) {
        this.originX = originX;
        this._displayOriginX = this.width * originX;
        return this;
    }

    setOriginY(originY) {
        this.originY = originY;
        this._displayOriginY = this.height * originY;
        return this;
    }

    setOrigin(originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }
        this.setOriginX(originX).setOriginY(originY);
        return this;
    }

    get depth() {
        return this._depth;
    }

    set depth(value) {
        this.setDisplayListDirty(this._depth != value);
        this._depth = value;
    }

    setDepth(depth) {
        if (depth === undefined) {
            depth = 0;
        }

        this.depth = depth;
        return this;
    }

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        if (o.hasOwnProperty('x')) {
            this.setX(o.x);
        }
        if (o.hasOwnProperty('y')) {
            this.setY(o.y);
        }

        if (o.hasOwnProperty('rotation')) {
            this.setRotation(o.rotation);
        } else if (o.hasOwnProperty('angle')) {
            this.setAngle(o.angle);
        }

        if (o.hasOwnProperty('alpha')) {
            this.setAlpha(o.alpha);
        }

        // ScaleX, ScaleY
        var width = GetValue(o, 'width', undefined);
        var height = GetValue(o, 'height', undefined);
        var scale = GetValue(o, 'scale', undefined);
        var scaleX = GetValue(o, 'scaleX', scale);
        var scaleY = GetValue(o, 'scaleY', scale);

        if (width !== undefined) {
            if ((height === undefined) && (scaleY === undefined)) {
                this.setWidth(width, true);
            } else {
                this.setWidth(width);
            }
        } else if (scaleX !== undefined) {
            this.setScaleX(scaleX);
        } else if (o.hasOwnProperty('displayWidth')) {
            this.setDisplayWidth(o.displayWidth);
        }

        if (height !== undefined) {
            if ((width === undefined) && (scaleX === undefined)) {
                this.setHeight(height, true);
            } else {
                this.setHeight(height);
            }
        } else if (scaleY !== undefined) {
            this.setScaleY(scaleY);
        } else if (o.hasOwnProperty('displayHeight')) {
            this.setDisplayHeight(o.displayHeight);
        }

        var origin = GetValue(o, 'origin', undefined);
        if (origin !== undefined) {
            this.setOrigin(origin);
        } else {
            if (o.hasOwnProperty('originX')) {
                this.setOriginX(o.originX);
            }
            if (o.hasOwnProperty('originY')) {
                this.setOriginY(o.originY);
            }
        }

        if (o.hasOwnProperty('depth')) {
            this.setDepth(o.depth);
        }

        return this;
    }

    reset() {
        super.reset();

        this
            .setVisible()
            .setAlpha(1)
            .setPosition(0, 0)
            .setRotation(0)
            .setScale(1, 1)
            .setOrigin(0)
            .setDepth(0)

        return this;
    }

    // Override
    webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
    }
    // Override
    canvasRender(ctx, dx, dy, roundPixels) {
    }
}

export default RenderBase;