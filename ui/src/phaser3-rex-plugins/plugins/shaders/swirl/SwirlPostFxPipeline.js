import FragSrc from './swirl-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const DegToRad = Phaser.Math.DegToRad;
const RadToDeg = Phaser.Math.RadToDeg;

class SwirlPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexSwirlPostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.centerX = 0; // position wo resolution
        this.centerY = 0; // position wo resolution
        this.radius = 0;
        this.rotation = 0;
    }

    resetFromJSON(o) {
        this.radius = GetValue(o, 'radius', 0);
        var rotation = GetValue(o, 'rotation', undefined);
        if (rotation === undefined) {
            this.setAngle(GetValue(o, 'angle', 0));
        } else {
            this.setRotation(rotation);
        }
        this.setCenter(GetValue(o, 'center.x', undefined), GetValue(o, 'center.y', undefined));
        return this;
    }

    onPreRender() {
        this.set1f('radius', this.radius);
        this.set1f('angle', this.rotation);

        var texWidth = this.renderer.width,
            textHeight = this.renderer.height;
        this.set2f('center', this.centerX, (textHeight - this.centerY));
        this.set2f('texSize', texWidth, textHeight);
    }

    // radius
    setRadius(value) {
        this.radius = value;
        return this;
    }

    // rotation
    setRotation(value) {
        this.rotation = value;
        return this;
    }

    get angle() {
        return RadToDeg(this.rotation);
    }

    set angle(value) {
        this.rotation = DegToRad(value);
    }

    setAngle(value) {
        this.angle = value;
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
}

export default SwirlPostFxPipeline;