import FragSrc from './glowfilter-postfxfrag';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class GlowFilterPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexGlowFilterPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.intensity = 0;
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 0));
        return this;
    }

    onPreRender() {
        this.set1f('intensity', this.intensity);
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default GlowFilterPostFxPipeline;