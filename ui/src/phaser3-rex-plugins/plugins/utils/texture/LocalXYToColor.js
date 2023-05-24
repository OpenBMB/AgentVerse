var LocalXYToColor = function (gameObject, localX, localY) {
    var textureKey = gameObject.texture.key;
    var frameName = gameObject.frame.name;
    var textureManager = gameObject.scene.sys.textures;
    var color = textureManager.getPixel(localX, localY, textureKey, frameName);
    return color;
}

export default LocalXYToColor;