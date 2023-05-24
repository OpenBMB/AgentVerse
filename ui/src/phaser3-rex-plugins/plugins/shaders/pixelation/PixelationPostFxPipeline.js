import FragSrc from './pixelation-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;


class PixelationPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexPixelationPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.pixelWidth = 4; // width of pixel wo resolution
        this.pixelHeight = 4; // height of pixel wo resolution
    }

    resetFromJSON(o) {
        var pixelSize = GetValue(o, 'pixelSize', 4);
        this.setPixelSize(GetValue(o, 'pixelWidth', pixelSize), GetValue(o, 'pixelHeight', pixelSize));
        return this;
    }

    onPreRender() {
        this.set2f('pixelSize', this.pixelWidth, this.pixelHeight);
        this.set2f('texSize', this.renderer.width, this.renderer.height);
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
    
    get pixelSize() {
        return (this.pixelWidth + this.pixelHeight) / 2;
    }

    set pixelSize(value) {
        this.pixelWidth = value;
        this.pixelHeight = value;
    }

}

export default PixelationPostFxPipeline;