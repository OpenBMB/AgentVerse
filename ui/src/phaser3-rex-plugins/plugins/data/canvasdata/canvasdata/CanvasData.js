import Color32Methods from '../../../utils/math/color/Color32Methods.js';

class CanvasData {
    constructor(BufferClass, width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = width;
        }

        this.width = width;
        this.height = height;
        this.buffer = new BufferClass(width * height);
    }

    destroy() {
        this.buffer.destroy();
        this.buffer = undefined;
    }

    getOffset(x, y) {
        return y * this.width + x;
    }

    get(x, y) {
        var offset
        if (arguments.length === 2) {
            offset = this.getOffset(x, y);
        } else {
            offset = x;
        }
        return this.buffer.get(offset);
    }

    set(x, y, value) {
        var offset
        if (arguments.length === 3) {
            offset = this.getOffset(x, y);
        } else {
            offset = x;
            value = y;
        }
        this.buffer.set(offset, value);
        return this;
    }

    fill(canvas, x, y, width, height, callback, scope) {
        if (typeof (canvas) === 'number') {
            var value = canvas;
            this.buffer.fill(value);

        } else {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = canvas.width - x;
            }
            if (height === undefined) {
                height = canvas.height - y;
            }
            this.resize(width, height);
            var context = canvas.getContext('2d', { willReadFrequently: true });
            var imgData = context.getImageData(x, y, width, height).data;
            var pixels = imgData.length, imgDataIndex;
            var value;
            for (var i = 0, cnt = pixels / 4; i < cnt; i++) {
                imgDataIndex = i * 4;
                if (scope) {
                    value = callback.call(scope, imgData, imgDataIndex);
                } else {
                    value = callback(imgData, imgDataIndex);
                }
                this.set(i, value);
            }
        }

        return this;
    }

    clear() {
        this.fill(0);
        return this;
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.width = width;
        this.height = height;
        this.buffer.resize(width * height);
        return this;
    }

    forEach(callback, scope, skipZero) {
        if (skipZero === undefined) {
            skipZero = false;
        }
        var value;
        for (var y = 0, h = this.height; y < h; y++) {
            for (var x = 0, w = this.width; x < w; x++) {
                value = this.get(x, y);
                if (skipZero &&
                    ((value === 0) || (value === false))
                ) {
                    continue;
                }

                if (scope) {
                    callback.call(scope, value, x, y, this);
                } else {
                    callback(value, x, y, this);
                }
            }
        }
        return this;
    }

    forEachNonZero(callback, scope) {
        this.forEach(callback, scope, true);
        return this;
    }
};

Object.assign(
    CanvasData.prototype,
    Color32Methods
);

export default CanvasData;