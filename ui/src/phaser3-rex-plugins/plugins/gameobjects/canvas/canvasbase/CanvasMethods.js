const Color = Phaser.Display.Color;

export default {
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.dirty = true;
        return this;
    },

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.dirty = true;
        return this;
    },

    drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {

        var textureFrame = this.scene.sys.textures.getFrame(key, frame);
        if (!textureFrame) {
            return this;
        }

        var frameWidth = textureFrame.cutWidth,
            frameHeight = textureFrame.cutHeight;

        if (dx === undefined) { dx = 0; }
        if (dy === undefined) { dy = 0; }
        if (dWidth === undefined) { dWidth = frameWidth; }
        if (dHeight === undefined) { dHeight = frameHeight; }
        if (sxOffset === undefined) { sxOffset = 0; }
        if (syOffset === undefined) { syOffset = 0; }
        if (sWidth === undefined) { sWidth = frameWidth; }
        if (sHeight === undefined) { sHeight = frameHeight; }

        var sx = textureFrame.cutX + sxOffset;
        var sy = textureFrame.cutY + syOffset;

        this.context.drawImage(
            textureFrame.source.image,  // image
            sx, sy, sWidth, sHeight,
            dx, dy, dWidth, dHeight
        );

        this.dirty = true;

        return this;
    },

    getDataURL(type, encoderOptions) {
        return this.canvas.toDataURL(type, encoderOptions);
    },

    getPixel(x, y, out) {
        if (out === undefined) {
            out = new Color();
        }
        var rgb = this.context.getImageData(x, y, 1, 1);
        out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3])
        return out;
    },

    setPixel(x, y, r, g, b, a) {
        if (typeof (r) !== 'number') {
            var color = r;
            r = color.red;
            g = color.green;
            b = color.blue;
            a = color.alpha;
        }

        if (a === undefined) {
            a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
        }

        var imgData = this.context.createImageData(1, 1);
        imgData.data[0] = r;
        imgData.data[1] = g;
        imgData.data[2] = b;
        imgData.data[3] = a;
        this.context.putImageData(imgData, x, y);
        this.dirty = true;
        return this;
    }
}