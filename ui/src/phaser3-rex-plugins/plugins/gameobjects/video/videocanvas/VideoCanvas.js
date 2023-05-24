import VideoBase from '../videobase/VideoBase.js';
import Canvas from '../../canvas/canvasbase/Canvas.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class VideoCanvas extends VideoBase(Canvas) {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }

        if (config === undefined) {
            config = {};
        }
        var autoRound = scene.sys.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width;
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height;
        }

        super(scene, x, y, width, height);
        this.type = 'rexVideoCanvas';

        this.createVideoElement(config);
        this.load(GetValue(config, 'src', ''));
    }

    renderWebGL(renderer, src,  camera, parentMatrix) {
        if (this.readyState > 0) {
            this.renderer.canvasToTexture(this.video, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        } else {
            var renderer = this.renderer;
            var gl = renderer.gl;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            renderer.setFramebuffer(null, true);
        }
        super.renderWebGL(renderer, src,  camera, parentMatrix);
    }

    renderCanvas(renderer, src,  camera, parentMatrix) {
        if (this.readyState > 0) {
            this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        super.renderCanvas(renderer, src,  camera, parentMatrix);
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.video.width = width;
        this.video.height = height;
        super.resize(width, height);
        return this;
    }
}
export default VideoCanvas;