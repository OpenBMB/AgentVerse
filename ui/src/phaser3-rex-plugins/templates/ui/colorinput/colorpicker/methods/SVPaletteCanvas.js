import Canvas from '../../../canvas/Canvas.js';
import { DrawSVPalette } from '../../../../../plugins/utils/canvas/DrawHSVPalette.js';

const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;
const ColorToRGBA = Phaser.Display.Color.ColorToRGBA;
const HSVToRGB = Phaser.Display.Color.HSVToRGB;

class SVPaletteCanvas extends Canvas {
    constructor(scene, x, y, width, height, hue) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 2; }
        if (height === undefined) { height = 2; }

        super(scene, x, y, width, height);
        this.type = 'rexColorPicker.SVPaletteCanvas';

        if (hue === undefined) {
            hue = 1;
        }

        this.colorObject = new Color();

        this.setHue(hue);
        this.setSize(width, height);
    }

    get color() {
        return this.colorObject.color;
    }

    get hue() {
        return this._hue;
    }

    set hue(hue) {
        if (this._hue === hue) {
            return;
        }
        this._hue = hue;
        this.colorObject.h = hue;
        this.dirty = true;
    }

    setHue(hue) {
        this.hue = hue;
        return this;
    }

    updateTexture() {
        DrawSVPalette(this.canvas, this.context, this.hue);
        super.updateTexture();
        return this;
    }

    getColor(localX, localY) {
        if (localX === undefined) {
            return this.colorObject.color;
        }

        var s = Percent(localX, 0, this.width);
        var v = 1 - Percent(localY, 0, this.height);
        this.colorObject.setFromRGB(HSVToRGB(this.hue, s, v));
        return this.colorObject.color;
    }

    setColor(color) {
        if (this.color === color) {
            return this;
        }

        this.colorObject.setFromRGB(ColorToRGBA(color));
        this.setHue(this.colorObject.h);
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
        out.x = this.width * this.colorObject.s;
        out.y = this.height * (1 - this.colorObject.v);

        return out;
    }
}

var LocalXY = undefined;

export default SVPaletteCanvas;