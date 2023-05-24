const DegToRad = Phaser.Math.DegToRad;

var OnParseRotateCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.rotate';
    parser
        .on(`+${tagName}`, function (value) {
            tagPlayer.targetCamera.setRotation(DegToRad(value));

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            value = DegToRad(value);
            tagPlayer.targetCamera.rotateTo(DegToRad(value), false, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseRotateCameraTag;