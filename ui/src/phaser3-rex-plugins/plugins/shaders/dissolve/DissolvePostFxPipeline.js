import FragSrc from './dissolve-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class DissolvePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexDissolvePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._progress = 0;
        this.toFrame = null;
        this.targetTexture = null;
        this.resizeMode = 1;
        this.toRatio = 1;

        this.noiseX = 0;
        this.noiseY = 0;
        this.noiseZ = 0;
        this.fromEdgeStart = 0.01;
        this.fromEdgeWidth = 0.05;
        this.toEdgeStart = 0.01;
        this.toEdgeWidth = 0.05;
    }

    resetFromJSON(o) {
        this.setProgress(GetValue(o, 'progress', 0));
        this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
        this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
        this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
        this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
        return this;
    }

    onBoot() {
        this.setTransitionTargetTexture();
    }

    onPreRender() {
        this.set1f('progress', this.progress);
        this.set1i('resizeMode', this.resizeMode);

        this.set1f('noiseX', this.noiseX);
        this.set1f('noiseY', this.noiseY);
        this.set1f('noiseZ', this.noiseZ);
        this.set1f('fromEdgeStart', this.fromEdgeStart);
        this.set1f('fromEdgeWidth', this.fromEdgeWidth);
        this.set1f('toEdgeStart', this.toEdgeStart);
        this.set1f('toEdgeWidth', this.toEdgeWidth);
    }

    onDraw(renderTarget) {
        this.set1f('fromRatio', renderTarget.width / renderTarget.height);

        this.bindTexture(this.targetTexture, 1);

        this.bindAndDraw(renderTarget);
    }

    get progress() {
        return this._progress;
    }

    set progress(value) {
        this._progress = Clamp(value, 0, 1);
    }

    setProgress(value) {
        this.progress = value;
        return this;
    }

    setTransitionTargetTexture(key, frame, resizeMode) {
        if (key === undefined) {
            key = '__DEFAULT';
        }
        var phaserTexture = this.game.textures.getFrame(key, frame);

        if (!phaserTexture) {
            phaserTexture = this.game.textures.getFrame('__DEFAULT');
        }

        this.toRatio = phaserTexture.width / phaserTexture.height;

        this.toFrame = phaserTexture;
        this.targetTexture = phaserTexture.glTexture;

        if (resizeMode !== undefined) {
            this.resizeMode = resizeMode;
        }

        this.set1i('uMainSampler2', 1);
        this.set1f('toRatio', this.toRatio);

        return this;
    }

    setResizeMode(mode) {
        if (typeof (mode) === 'string') {
            mode = ResizeMode[mode];
        }
        this.resizeMode = mode;
        return this;
    }

    setNoise(x, y, z) {
        if (x === undefined) {
            x = 4 + Math.random() * 6;
        }
        if (y === undefined) {
            y = 4 + Math.random() * 6;
        }
        if (z === undefined) {
            z = Math.random() * 10;
        }
        this.noiseX = x;
        this.noiseY = y;
        this.noiseZ = z;
        return this;
    }

    setFromEdge(edgeStart, edgeWidth) {
        this.fromEdgeStart = edgeStart;
        this.fromEdgeWidth = edgeWidth;
        return this;
    }

    setToEdge(edgeStart, edgeWidth) {
        this.toEdgeStart = edgeStart;
        this.toEdgeWidth = edgeWidth;
        return this;
    }
}

/**
 * Set the resize mode of the target texture.
 * 
 * Can be either:
 * 
 * 0 - Stretch. The target texture is stretched to the size of the source texture.
 * 1 - Contain. The target texture is resized to fit the source texture. This is the default.
 * 2 - Cover. The target texture is resized to cover the source texture.
 * 
 * If the source and target textures are the same size, then use a resize mode of zero
 * for speed.
 *
 */
var ResizeMode = {
    stretch: 0,
    contain: 1,
    cover: 2
}

export default DissolvePostFxPipeline;