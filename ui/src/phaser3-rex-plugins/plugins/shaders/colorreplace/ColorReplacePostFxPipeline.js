import FragSrc from './colorreplace-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class ColorReplacePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexColorReplacePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.epsilon = 0.4;
        this._originalColor = new Color();
        this._newColor = new Color();
    }

    resetFromJSON(o) {
        this.setEpsilon(GetValue(o, 'epsilon', 0.4));
        this.setOriginalColor(GetValue(o, 'originalColor', 0xff0000));
        this.setNewColor(GetValue(o, 'newColor', 0x000000));
        return this;
    }

    onPreRender() {
        this.set1f('epsilon', this.epsilon);
        this.set3f('originalColor', this._originalColor.redGL, this._originalColor.greenGL, this._originalColor.blueGL);
        this.set3f('newColor', this._newColor.redGL, this._newColor.greenGL, this._newColor.blueGL);
    }

    setEpsilon(value) {
        this.epsilon = value;
        return this;
    }

    get originalColor() {
        return this._originalColor;
    }

    set originalColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._originalColor.setFromRGB(value);
    }

    setOriginalColor(value) {
        this.originalColor = value;
        return this;
    }

    get newColor() {
        return this._newColor;
    }

    set newColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._newColor.setFromRGB(value);
    }

    setNewColor(value) {
        this.newColor = value;
        return this;
    }
}

export default ColorReplacePostFxPipeline;