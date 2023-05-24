import FragSrc from './crossstitching-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class CrossStitchingPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexCrossStitchingPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.stitchingWidth = 6; // width of stitching wo resolution
        this.stitchingHeight = 6; // height of stitching wo resolution
        this._brightness = 0;
    }

    resetFromJSON(o) {
        this.setStitchingSize(GetValue(o, 'stitchingWidth', 6), GetValue(o, 'stitchingHeight', 6));
        this.setBrightness(GetValue(o, 'brightness', 0));
        return this;
    }

    onPreRender() {
        this.set2f('stitchingSize', this.stitchingWidth, this.stitchingHeight);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
        this.set1f('brightness', this._brightness);
    }

    // stitchingWidth
    setStitchingWidth(value) {
        this.stitchingWidth = value;
        return this;
    }

    // stitchingHeight
    setStitchingHeight(value) {
        this.stitchingHeight = value;
        return this;
    }

    setStitchingSize(width, height) {
        if (height === undefined) {
            height = width;
        }
        this.stitchingWidth = width;
        this.stitchingHeight = height;
        return this;
    }

    // brightness
    get brightness() {
        return this._brightness;
    }

    set brightness(value) {
        this._brightness = Clamp(value, 0, 1);
    }

    setBrightness(value) {
        this.brightness = value;
        return this;
    }
}

export default CrossStitchingPostFxPipeline;