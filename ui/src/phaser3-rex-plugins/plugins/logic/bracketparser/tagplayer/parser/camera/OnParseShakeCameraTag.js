var OnParseShakeCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            tagPlayer.targetCamera.shake(duration, intensity);

            parser.skipEvent();
        })
}

export default OnParseShakeCameraTag;