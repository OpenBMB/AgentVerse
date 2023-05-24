import FragSrc from './kawaseblurFilter-postfxfrag.js';
import GenerateKernels from './GenerateKernels.js';
import KawaseBlurDrawer from './KawaseBlurDrawer.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class KawaseBlurFilterPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexKawaseBlurFilterPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.drawer = new KawaseBlurDrawer(this);
        this._kernels = [0];
        this._blur = 0;
        this._quality = 1;
        this.pixelWidth = 1; // width of pixel wo resolution
        this.pixelHeight = 1; // height of pixel wo resolution
    }

    resetFromJSON(o) {
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
        this.drawer.draw(this.drawer.init(renderTarget));
    }

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

export default KawaseBlurFilterPostFxPipeline;