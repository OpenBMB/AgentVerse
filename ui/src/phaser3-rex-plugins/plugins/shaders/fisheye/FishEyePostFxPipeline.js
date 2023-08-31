import FragSrc from './fisheye-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;


class FishEyePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexFishEyePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.fishEyeMode = 0;
        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.intensity = 1;
    }

    resetFromJSON(o) {
        this.setFishEyeMode(GetValue(o, 'mode', 0));
        this.setRadius(GetValue(o, 'radius', 0));
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
    }

    onPreRender() {
        this.set1f('mode', this.fishEyeMode);

        this.set1f('radius', this.radius);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this.centerX, (textHeight - this.centerY));
        this.set2f('texSize', texWidth, textHeight);

        this.set1f('intensity', this.intensity);        
    }

    // Mode
    setFishEyeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = FishEyeMode[mode];
        }
        this.fishEyeMode = mode;
        return this;
    }

    // radius
    setRadius(value) {
        this.radius = value;
        return this;
    }

    // center
    setCenter(x, y) {
        if (x === undefined) {
            x = this.renderer.width / 2;
            y = this.renderer.height / 2;
        }
        this.centerX = x;
        this.centerY = y;
        return this;
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

const FishEyeMode = {
    'asin': 0,
    'sin': 1
}

export default FishEyePostFxPipeline;