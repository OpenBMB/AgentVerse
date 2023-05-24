var LoadBinaryAndImage = function (scene, key, url, imageType, onLoadBinary) {
    if (typeof (imageType) === 'function') {
        onLoadBinary = imageType;
        imageType = undefined;
    }

    // png, jpeg, webp
    if (imageType === undefined) {
        var slices = url.split('.')
        imageType = slices[slices.length - 1];
    }

    scene.load.binary(key, url, Uint8Array);
    scene.load.once(`filecomplete-binary-${key}`, function () {
        var buffer = scene.cache.binary.get(key);
        if (onLoadBinary) {
            buffer = onLoadBinary(buffer);
        }

        var blob = new Blob([buffer], { type: `image/${imageType}` });
        url = window.URL.createObjectURL(blob);
        scene.load.image(key, url);
    }, this);
}

export default LoadBinaryAndImage;