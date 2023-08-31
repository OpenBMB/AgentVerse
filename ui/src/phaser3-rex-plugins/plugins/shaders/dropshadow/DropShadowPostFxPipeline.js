import FragSrc from './dropshadow-postfxfrag.js';
import KawaseBlurFragSrc from '../kawaseblur/kawaseblurFilter-postfxfrag.js';
import GenerateKernels from '../kawaseblur/GenerateKernels.js';
import ShadowDrawer from './ShadowDrawer.js'
import KawaseBlurDrawer from '../kawaseblur/KawaseBlurDrawer.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class DropShadowPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexDropShadowPostFx',
            game: game,
            shaders: [
                { fragShader: FragSrc, },
                { fragShader: KawaseBlurFragSrc, },
            ],
        });

        this.shadowDrawer = new ShadowDrawer(this, this.shaders[0]);
        this.kawaseBlurDrawer = new KawaseBlurDrawer(this, this.shaders[1]);

        this.rotation = 0;
        this.distance = 0;
        this._shadowColor = new Color();
        this.alpha = 0.5;
        this.shadowOnly = false;

        // KawaseBlur
        this._kernels = [0];
        this._blur = 0;
        this._quality = 1;
        this.pixelWidth = 1; // width of pixel wo resolution
        this.pixelHeight = 1; // height of pixel wo resolution
    }

    resetFromJSON(o) {
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 45));
        } else {
            this.setRotation(rotation);
        }

        this.setDistance(GetValue(o, 'distance', 5));

        this.setShadowColor(GetValue(o, 'shadowColor', 0xffffff));
        this.setAlpha(GetValue(o, 'alpha', 0.5));

        this.setShadowOnly(GetValue(o, 'shadowOnly', false));

        // KawaseBlur
        var blur = GetValue(o, 'blur', 4);
        if (typeof(blur) === 'number') {
            this.setBlur(blur);
            this.setQuality(GetValue(o, 'quality', 3));
        } else {
            this.setKernela(blur);
        }

        this.setPixelSize(GetValue(o, 'pixelWidth', 1), GetValue(o, 'pixelHeight', 1));

        return this;
    }

    onPreRender() {
    }

    onDraw(renderTarget) {
        var targetFrame;
        
        // shadow
        targetFrame = this.shadowDrawer.draw(this.shadowDrawer.init(renderTarget), true);

        // kawase-blur
        targetFrame = this.kawaseBlurDrawer.draw(targetFrame, true);

        // Add renderTarget to result
        if (!this.shadowOnly) {
            this.copyFrame(renderTarget, targetFrame, 1, false);
        }

        this.copyToGame(targetFrame);
    }

    // rotation
    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
        return this;
    }

    // distance
    setDistance(value) {
        this.distance = value;
        return this;
    }

    // shadow color
    get shadowColor() {
        return this._shadowColor;
    }

    set shadowColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._shadowColor.setFromRGB(value);
    }

    setShadowColor(value) {
        this.shadowColor = value;
        return this;
    }

    // alpha
    setAlpha(value) {
        this.alpha = value;
        return this;
    }

    // shadowOnly
    setShadowOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.shadowOnly = enable;
        return this;
    }

    // KawaseBlur
    // blur
    get blur() {
        return this._blur;
    }

    set blur(value) {
        if (this._blur === value) {
            return;
        }

        this._blur = value;
        GenerateKernels(this._blur, this._quality, this._kernels);
    }

    setBlur(value) {
        this.blur = value;
        return this;
    }

    // quality
    get quality() {
        return this._quality;
    }

    set quality(value) {
        if (this._quality === value) {
            return;
        }

        this._quality = value;
        GenerateKernels(this._blur, this._quality, this._kernels);
    }

    setQuality(value) {
        this.quality = value;
        return this;
    }

    // kernels
    get kernels() {
        return this._kernels;
    }

    set kernels(value) {
        if (value === undefined) {
            value = [0];
        }

        this._kernels = value;
        this._quality = value.length;
        this._blur = Math.max(...value);
    }

    setKernela(value) {
        this.kernels = value;
        return this;
    }

    // pixelWidth
    setPixelWidth(value) {
        this.pixelWidth = value;
        return this;
    }

    // pixelHeight
    setPixelHeight(value) {
        this.pixelHeight = value;
        return this;
    }

    setPixelSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.pixelWidth = width;
        this.pixelHeight = height;
        return this;
    }
}

export default DropShadowPostFxPipeline;