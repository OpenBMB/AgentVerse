const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var AddImage = function (key, config) {
    if (IsPlainObject(key)) {
        config = key;
        key = config.key;
    } else if (config === undefined) {
        config = {
            key: key
        }
    }

    if (!config.hasOwnProperty('key')) {
        config.key = key;
    }

    var textureKey = config.key, frameKey = config.frame;
    var width = config.width, height = config.height;

    if ((width === undefined) || (height === undefined)) {
        var frame = this.textureManager.getFrame(textureKey, frameKey);
        var frameWidth = (frame) ? frame.cutWidth : 0;
        var frameHeight = (frame) ? frame.cutHeight : 0;
        if ((width === undefined) && (height === undefined)) {
            width = frameWidth;
            height = frameHeight;
        } else if (width === undefined) {
            width = frameWidth * (height / frameHeight);
        } else if (height === undefined) {
            height = frameHeight * (width / frameWidth);
        }
    }

    this.images[key] = {
        key: textureKey,
        frame: frameKey,
        width: width,
        height: height,
        y: GetValue(config, 'y', 0),
        left: GetValue(config, 'left', 0),
        right: GetValue(config, 'right', 0),
        originX: GetValue(config, 'originX', 0),
        originY: GetValue(config, 'originY', 0),
    }
}

export default AddImage;