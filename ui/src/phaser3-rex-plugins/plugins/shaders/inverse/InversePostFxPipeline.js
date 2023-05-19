import FragSrc from './inverse-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;

class InversePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexInversePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.intensity = 1;
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 1));
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

export default InversePostFxPipeline;