import Canvas from '../../../canvas/Canvas.js';
import GetOrientationMode from '../../../utils/GetOrientationMode.js';
import { DrawHPalette } from '../../../../../plugins/utils/canvas/DrawHSVPalette.js';

const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;
const HSVToRGB = Phaser.Display.Color.HSVToRGB;

class HPaletteCanvas extends Canvas {
    constructor(scene, x, y, width, height, orientation) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = 2; }

        super(scene, x, y, width, height);
        this.type = 'rexColorPicker.HPaletteCanvas';

        this.colorObject = new Color();

        this.setOrientation(orientation);
        this.setSize(width, height);
    }

    setOrientation(orientation) {
        this.orientation = GetOrientationMode(orientation);
        return this;
    }

    updateTexture() {
        DrawHPalette(this.canvas, this.context, this.orientation);
        super.updateTexture();
        return this;
    }

    get color() {
        return this.colorObject.color;
    }

    get hue() {
        return this._hue;
    }

    set hue(value) {
        this._hue = value;
    }

    getHue(localX, localY) {
        if (localX === undefined) {
            return this.hue;
        }

        if (this.orientation === 0) {
            this.hue = Percent(localX, 0, this.width);
        } else {
            this.hue = Percent(localY, 0, this.height);
        }

        return this.hue;
    }

    getColor(localX, localY) {
        if (localX === undefined) {
            return this.color;
        }

        var h = this.getHue(localX, localY);
        this.colorObject.setFromRGB(HSVToRGB(h, 1, 1));
        return this.colorObject.color;
    }

    setColor(color) {
        if (this.color === color) {
            return this;
        }

        return this;
    }

    colorToLocalPosition(color, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (LocalXY === undefined) {
                LocalXY = {};
            }
            out = LocalXY;
        }

        this.colorObject.setFromRGB(ColorToRGBA(color));

        if (this.orientation === 0) {
            out.x = this.width * this.colorObject.h;
            out.y = this.height / 2;
        } else {
            out.x = this.width / 2;
            out.y = this.height * this.colorObject.h;
        }

        return out;
    }
}

var LocalXY = undefined;

export default HPaletteCanvas;