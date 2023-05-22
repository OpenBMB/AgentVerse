var GetFaceSize = function (scene, images) {
    if (!images) {
        return null;
    }
    if (Array.isArray(images)) {
        var textureKey = images[0];
        var frame = scene.sys.textures.getFrame(textureKey.key, textureKey.frame);
        result.width = frame.cutWidth;
        result.height = frame.cutHeight;
    } else {
        result.width = images.width;
        result.height = images.height;
    }
    return result;
}

var result = {};

export default GetFaceSize;