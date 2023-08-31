import FragSrc from './shockwave-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class ShockwavePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexShockwavePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.waveWidth = 20;
        this.powBaseScale = 0.8;
        this.powExponent = 0.1;
    }

    resetFromJSON(o) {
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        this.setWaveRadius(GetValue(o, 'waveRadius', 0));
        this.setWaveWidth(GetValue(o, 'waveWidth', 20));
        this.setPowBaseScale(GetValue(o, 'powBaseScale', 0.8));
        this.setPowExponent(GetValue(o, 'powExponent', 0.1));        
        return this;
    }

    onPreRender() {
        this.set1f('waveRadius', this.waveRadius);
        this.set1f('waveHalfWidth', this.waveWidth / 2);
        this.set1f('powBaseScale', this.powBaseScale);
        this.set1f('powExponent', this.powExponent);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this.centerX, (textHeight - this.centerY));
        this.set2f('texSize', texWidth, textHeight);
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

    // waveRadius
    setWaveRadius(value) {
        if (value === undefined) {
            value = 0;
        }
        this.waveRadius = value;
        return this;
    }

    // waveWidth
    setWaveWidth(value) {
        if (value === undefined) {
            value = 0;
        }
        this.waveWidth = value;
        return this;
    }

    // powBaseScale
    setPowBaseScale(value) {
        this.powBaseScale = value;
        return this;
    }

    // powExponent
    setPowExponent(value) {
        this.powExponent = value;
        return this;
    }

}

export default ShockwavePostFxPipeline;