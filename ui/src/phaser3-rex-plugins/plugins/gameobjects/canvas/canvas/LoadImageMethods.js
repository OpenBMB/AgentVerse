export default {
    loadFromURL(url, callback) {
        var self = this;
        var img = new Image();
        img.onload = function () {
            if ((self.width !== img.width) || (self.height !== img.height)) {
                self.resize(img.width, img.height);
            } else {
                self.clear();
            }
            self.context.drawImage(img, 0, 0);
            self.updateTexture();

            if (callback) {
                callback();
            }

            img.onload = null;
            img.src = '';
            img.remove();
        }
        img.src = url;
        return this;
    },

    loadFromURLPromise(url) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.loadFromURL(url, resolve);
        });
    },

    loadFromFile(file, callback) {
        var url = URL.createObjectURL(file);
        this.loadFromURL(url, function () {
            URL.revokeObjectURL(url);
            if (callback) {
                callback();
            }
        })

        return this;
    },

    loadFromFilePromise(file) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.loadFromFile(file, resolve);
        });
    }
}