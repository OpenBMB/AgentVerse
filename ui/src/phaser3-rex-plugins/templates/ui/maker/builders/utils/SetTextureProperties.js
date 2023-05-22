const ProperiteList = ['tint', 'alpha', 'visible', 'flipX', 'flipY'];

var SetTextureProperties = function (gameObject, data) {
    for (var i = 0, cnt = ProperiteList.length; i < cnt; i++) {
        var key = ProperiteList[i];
        var value = data[key];
        if (value !== undefined) {
            gameObject[key] = value;
        }
    }

    if (data.cropResize && !gameObject.resize) {
        gameObject.resize = function (width, height) {
            gameObject.setCrop(0, 0, width, height);
            return gameObject;
        }
    }

    return gameObject;
}

export default SetTextureProperties;