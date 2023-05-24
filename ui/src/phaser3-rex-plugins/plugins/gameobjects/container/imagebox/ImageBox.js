import Container from '../containerlite/ContainerLite.js';
import FitToSize from '../../../utils/size/FitTo.js';
import FlipMethods from '../utils/FlipMethods.js';
import HasTexture from '../../../utils/texture/HasTexture.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class ImageBox extends Container {
    constructor(scene, x, y, texture, frame, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            texture = GetValue(config, 'key', undefined);
            frame = GetValue(config, 'frame', undefined);
        } else if (IsPlainObject(frame)) {
            config = frame;
            frame = undefined;
        }

        var image = GetValue(config, 'image');
        if (!image) {
            image = scene.add.image(x, y, texture, frame);
            if (texture === undefined) {
                image.setVisible(false);
            }
        } else {
            image.setPosition(x, y).setOrigin(0.5);
        }

        super(scene, x, y, 1, 1);
        this.type = 'rexImageBox';

        this.add(image);
        this.image = image;

        var width = GetValue(config, 'width', image.width);
        var height = GetValue(config, 'height', image.height);
        this.resize(width, height);

    }

    get texture() {
        return this.image.texture;
    }

    get frame() {
        return this.image.frame;
    }

    get flipX() {
        return this._flipX;
    }

    set flipX(value) {
        if (this._flipX === value) {
            return;
        }

        this._flipX = value;
        this.image.setFlipX(value);
    }

    get flipY() {
        return this._flipY;
    }

    set flipY(value) {
        if (this._flipY === value) {
            return;
        }
        this._flipY = value;
        this.image.setFlipY(value);
    }

    scaleImage() {
        var image = this.image;

        var result = FitToSize(image, { width: this.width, height: this.height }, true);
        image.setDisplaySize(result.width, result.height);
        this.resetChildScaleState(image);
        return this;
    }

    resize(width, height) {
        super.resize(width, height);

        this.scaleImage();
        return this;
    }

    setTexture(texture, frame) {
        var image = this.image;
        image.setTexture(texture, frame);

        if (texture !== null) {
            this.setChildVisible(image, true);
            this.scaleImage();

        } else {
            this.setChildVisible(image, false);

        }
        return this;
    }
}

Object.assign(
    ImageBox.prototype,
    FlipMethods,
)

export default ImageBox;