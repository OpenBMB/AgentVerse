import FragSrc from './barrel-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;


class BarrelPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexBarrelPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.shrinkMode = false;
        this.fishEyeMode = 0;
        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.power = 1;
        this.intensity = 1;
    }

    resetFromJSON(o) {
        this.setShrinkMode(GetValue(o, 'shrink', false));
        this.setRadius(GetValue(o, 'radius', 0));
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setPower(GetValue(o, 'power', 0.5));
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
    }

    onPreRender() {
        this.set1f('shrinkMode', (this.shrinkMode) ? 1 : 0);
        this.set1f('radius', this.radius);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this.centerX, (textHeight - this.centerY));
        this.set2f('texSize', texWidth, textHeight);

        this.set1f('power', this.power);
        this.set1f('intensity', this.intensity);
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

    // power
    setPower(power) {
        this.power = power;
        return this;
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }

    // shrinkMode
    setShrinkMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.shrinkMode = mode;
        return this;
    }
}

export default BarrelPostFxPipeline;