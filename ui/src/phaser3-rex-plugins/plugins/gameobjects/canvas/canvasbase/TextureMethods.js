import CopyCanvasToTexture from '../../../utils/texture/CopyCanvasToTexture.js';

export default {
    updateTexture(callback, scope) {
        if (callback) {
            if (scope) {
                callback.call(scope, this.canvas, this.context);
            } else {
                callback(this.canvas, this.context);
            }
        }

        if ((this.canvas.width !== this.frame.width) || (this.canvas.height !== this.frame.height)) {
            this.frame.setSize(this.canvas.width, this.canvas.height);
        }
        if (this.renderer && this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        }
        this.dirty = false;

        var input = this.input;
        if (input && !input.customHitArea) {
            input.hitArea.width = this.width;
            input.hitArea.height = this.height;
        }
        return this;
    },

    generateTexture(key, x, y, width, height) {
        var srcCanvas = this.canvas;
        if (width === undefined) {
            width = srcCanvas.width;
        } else {
            width *= this.resolution;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        } else {
            height *= this.resolution;
        }

        CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);

        return this;
    },

    loadTexture(key, frame) {
        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
            return this;
        }

        if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
            this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
        } else {
            this.clear();
        }

        this.drawFrame(key, frame);
        this.dirty = true;
        return this;
    }

}