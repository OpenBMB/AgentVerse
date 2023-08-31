var OnParseFadeInCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.fadein';
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            tagPlayer.targetCamera.fadeIn(duration, red, green, blue);

            parser.skipEvent();
        })
}

export default OnParseFadeInCameraTag;