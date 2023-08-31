import AwaitFile from '../awaitloader/AwaitFile.js';


const LoaderCallback = function (key, uri, frameConfig) {
    this.addFile(CreateAwiatFile(this, key, uri, frameConfig));
    return this;
}

var CreateAwiatFile = function (loader, key, uri, frameConfig) {
    var callback = function (successCallback, failureCallback) {
        var imageElement = new Image();
        imageElement.onload = function () {
            if (frameConfig === undefined) {
                loader.textureManager.addImage(key, imageElement);
            } else {
                loader.textureManager.addSpriteSheet(key, imageElement, frameConfig);
            }
            successCallback();
        }
        imageElement.src = uri;
    }

    return new AwaitFile(loader, {
        type: 'imageuri',
        config: {
            key: key,
            callback: callback
        }
    });
}

export default LoaderCallback;