import Image from '../image/Image.js';
import Skew from './Skew.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class SkewImage extends Image {
    constructor(scene, x, y, key, frame) {
        if (IsPlainObject(x)) {
            var config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            key = GetValue(config, 'key', null);
            frame = GetValue(config, 'frame', null);
        }

        super(scene, x, y, key, frame);
        this.type = 'rexSkewmage';

        this._skewX = 0;
        this._skewY = 0;
    }

    get skewX() {
        return this._skewX;
    }

    set skewX(value) {
        this._skewX = value;
        Skew(this, this._skewX, this._skewY);
    }

    get skewXDeg() {
        return RadToDeg(this._skewX);
    }

    set skewXDeg(value) {
        this.skewX = DegToRad(value);
    }

    get skewY() {
        return this._skewY;
    }

    set skewY(value) {
        this._skewY = value;
        Skew(this, this._skewX, this._skewY)
    }

    get skewYDeg() {
        return RadToDeg(this._skewY);
    }

    set skewYDeg(value) {
        this.skewY = DegToRad(value);
    }

    setSkewX(skewX) {
        this.skewX = skewX;
        return this;
    }

    setSkewY(skewY) {
        this.skewY = skewY;
        return this;
    }

    setSkew(skewX, skewY) {
        if (skewY === undefined) {
            skewY = skewX;
        }
        this.skewX = skewX;
        this.skewY = skewY;
        return this;
    }

    setSkewXDeg(skewX) {
        this.skewXDeg = skewX;
        return this;
    }

    setSkewYDeg(skewY) {
        this.skewYDeg = skewY;
        return this;
    }

    setSkewDeg(skewX, skewY) {
        if (skewY === undefined) {
            skewY = skewX;
        }
        this.skewXDeg = skewX;
        this.skewYDeg = skewY;
        return this;
    }

}

export default SkewImage;