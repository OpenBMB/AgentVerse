var BinaryToTextureCache = function (scene, buffer, textureKey, imageType) {
    if (typeof (buffer) === 'string') {
        buffer = scene.cache.binary.get(buffer);
    }

    if (!buffer) {
        return;
    }

    // png, jpeg, webp
    if (imageType === undefined) {
        imageType = 'png';
    }

    var blob = new Blob([buffer], { type: `image/${imageType}` });
    var url = window.URL.createObjectURL(blob);
    scene.load.image(textureKey, url);

    // url Will be removed in loader
}

export default BinaryToTextureCache;