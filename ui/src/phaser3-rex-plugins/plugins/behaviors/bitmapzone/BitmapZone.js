const GetRandom = Phaser.Utils.Array.GetRandom;
const GetValue = Phaser.Utils.Objects.GetValue;

class BitmapZone {
    constructor(canvasObject, config) {
        this.data = [];
        this.setSource(canvasObject, config);
    }

    setSource(canvasObject, config) {
        var canvas = canvasObject.canvas;

        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var width = GetValue(config, 'width', canvas.width - x);
        var height = GetValue(config, 'height', canvas.height - y);

        var context = canvas.getContext('2d', { willReadFrequently: true });
        var imgData = context.getImageData(x, y, width, height).data;
        var data = this.data;
        data.length = 0;
        for (var i = 0, cnt = (imgData.length / 4); i < cnt; i++) {
            if (imgData[(i * 4) + 3] > 0) {
                data.push(i);
            }
        }

        this.width = width;
        this.height = height;

        var scaleX = GetValue(config, 'scaleX', canvasObject);
        var scaleY = GetValue(config, 'scaleY', undefined);
        this.setScale(scaleX, scaleY);

        var offsetX = GetValue(config, 'offsetX', canvasObject);
        var offsetY = GetValue(config, 'offsetY', undefined);
        this.setOffset(offsetX, offsetY);

        return this;
    }

    setOffset(offsetX, offsetY) {
        if (typeof (offsetX) !== 'number') {
            var canvasObject = offsetX;
            offsetX = -(canvasObject.originX * canvasObject.displayWidth);
            offsetY = -(canvasObject.originY * canvasObject.displayHeight);
        }
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        return this;
    }

    setScale(scaleX, scaleY) {
        if (typeof (scaleX) !== 'number') {
            var canvasObject = scaleX;
            scaleX = canvasObject.scaleX;
            scaleY = canvasObject.scaleY;
        }
        if (scaleY === undefined) {
            scaleY = scaleX;
        }
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    getRandomPoint(out) {
        if (out === undefined) {
            out = {};
        }
        if (this.data.length > 0) {
            var index = GetRandom(this.data);
            var x = index % this.width;
            var y = (index - x) / this.width;
            out.x = x * this.scaleX;
            out.y = y * this.scaleY;
        } else {
            out.x = 0;
            out.y = 0;
        }
        out.x += this.offsetX;
        out.y += this.offsetY;
        return out;
    }
}

export default BitmapZone;