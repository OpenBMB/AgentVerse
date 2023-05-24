import GetFrag from './glowfilter-postfxfrag';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

var Quality = 0.1;
var Distance = 10;
var FragSrc = GetFrag({ quality: Quality, distance: Distance });
class GlowFilterPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexGlowFilterPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.outerStrength = 0;
        this.innerStrength = 0;
        this._glowColor = new Color();
        this.knockout = false;
    }

    resetFromJSON(o) {
        this.setOuterStrength(GetValue(o, 'outerStrength', 4));
        this.setInnerStrength(GetValue(o, 'innerStrength', 0));
        this.setGlowColor(GetValue(o, 'glowColor', 0xffffff));
        this.setKnockout(GetValue(o, 'knockout', false));
        return this;
    }

    onPreRender() {
        this.set1f('outerStrength', this.outerStrength);
        this.set1f('innerStrength', this.innerStrength);

        var color = this._glowColor;
        this.set4f('glowColor', color.redGL, color.greenGL, color.blueGL, color.alphaGL);

        this.set1f('knockout', (this.knockout) ? 1 : 0);

        this.set2f('texSize', this.renderer.width, this.renderer.height);
    }

    // outerStrength
    setOuterStrength(value) {
        this.outerStrength = value;
        return this;
    }

    // innerStrength
    setInnerStrength(value) {
        this.innerStrength = value;
        return this;
    }

    // glowColor
    get glowColor() {
        return this._glowColor;
    }

    set glowColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._glowColor.setFromRGB(value);
    }

    setGlowColor(value) {
        this.glowColor = value;
        return this;
    }

    // knockout
    setKnockout(value) {
        this.knockout = value;
        return this;
    }

    static setQuality(value) {
        if (Quality === value) {
            return;
        }
        Quality = value;
        FragSrc = GetFrag({ quality: Quality, distance: Distance });
    }

    static getQuality() {
        return Quality;
    }

    static setDistance(value) {
        if (Distance === value) {
            return;
        }
        Distance = value;
        FragSrc = GetFrag({ quality: Quality, distance: Distance });
    }

    static getDistance() {
        return Distance;
    }

}

export default GlowFilterPostFxPipeline;