import Methods from './methods/Methods.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class CanvasFrameManager {
    constructor(scene, key, width, height, cellWidth, cellHeight, fillColor) {
        if (IsPlainObject(key)) {
            var config = key;
            key = GetValue(config, 'key');
            width = GetValue(config, 'width');
            height = GetValue(config, 'height');
            cellWidth = GetValue(config, 'cellWidth');
            cellHeight = GetValue(config, 'cellHeight');
            fillColor = GetValue(config, 'fillColor');
        }

        if (width === undefined) {
            width = 4096;
        }
        if (height === undefined) {
            height = 4096;
        }
        if (cellWidth === undefined) {
            cellWidth = 64;
        }
        if (cellHeight === undefined) {
            cellHeight = 64;
        }

        this.texture = scene.sys.textures.createCanvas(key, width, height);
        this.canvas = this.texture.getCanvas();
        this.context = this.texture.getContext();
        this.bitmapFontCache = scene.sys.cache.bitmapFont;

        if (fillColor !== undefined) {
            var context = this.context;
            context.fillStyle = fillColor;
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.key = key;
        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.columnCount = Math.floor(width / cellWidth);
        this.rowCount = Math.floor(height / cellHeight);
        this.totalCount = this.columnCount * this.rowCount;

        this.frameNames = Array(this.totalCount);
        for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
            this.frameNames[i] = undefined;
        }
    }

    destroy() {
        this.texture = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.frameNames = undefined;
        this.bitmapFontCache = undefined;
    }

    getFrameIndex(frameName) {
        return this.frameNames.indexOf(frameName);
    }

    hasFrameName(frameName) {
        return this.getFrameIndex(frameName) !== -1;
    }

    addFrameName(index, frameName) {
        this.frameNames[index] = frameName;
        return this;
    }

    get isFull() {
        return this.getFrameIndex(undefined) === -1;
    }

    getTopLeftPosition(frameIndex, out) {
        if (out === undefined) {
            out = {};
        }

        var columnIndex = frameIndex % this.columnCount;
        var rowIndex = Math.floor(frameIndex / this.rowCount);
        out.x = columnIndex * this.cellWidth;
        out.y = rowIndex * this.cellHeight;
        return out;
    }

    updateTexture() {
        this.texture.refresh();
        return this;
    }

    remove(frameName) {
        var index = this.getFrameIndex(frameName);
        if (index === -1) {
            return this;
        }

        this.addFrameName(index, undefined);
        this.texture.remove(frameName);

        // Don't clear canvas

        return this;
    }

    clear() {
        for (var i, cnt = this.frameNames.length; i < cnt; i++) {
            var frameName = this.frameNames[i];
            if (frameName !== undefined) {
                this.addFrameName(index, undefined);
                this.texture.remove(frameName);
            }
        }

        return this;
    }
}

Object.assign(
    CanvasFrameManager.prototype,
    Methods
);

export default CanvasFrameManager;