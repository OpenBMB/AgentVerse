import AddImage from './AddImage.js';
import DrawImage from './DrawImage.js';

class ImageManager {
    constructor(scene) {
        this.textureManager = scene.sys.textures;
        this.images = {};
    }

    destroy() {
        this.textureManager = undefined;
        this.images = undefined;
    }

    add(key, config) {
        if (typeof (key) === 'string') {
            AddImage.call(this, key, config);
        } else if (Array.isArray(key)) {
            var data = key;
            for (var i = 0, cnt = data.length; i < cnt; i++) {
                AddImage.call(this, data[i]);
            }
        } else {
            var data = key;
            for (var key in data) {
                AddImage.call(this, key, data[key]);
            }
        }
        return this;
    }

    has(key) {
        return this.images.hasOwnProperty(key);
    }

    remove(key) {
        if (this.has(key)) {
            delete this.images[key];
        }
        return this;
    }

    get(key) {
        if (!this.has(key)) {
            if (this.textureManager.exists(key)) {
                this.add(key);
            }
        }
        return this.images[key];
    }

    getOuterWidth(key) {
        var data = this.get(key);
        return (data) ? (data.width + data.left + data.right) : 0;
    }

    getFrame(key) {
        var data = this.get(key);
        return (data) ? this.textureManager.getFrame(data.key, data.frame) : undefined;
    }

    hasTexture(key) {
        return !!this.getFrame(key);
    }
}

var methods = {
    draw: DrawImage
}

Object.assign(
    ImageManager.prototype,
    methods
);


export default ImageManager;