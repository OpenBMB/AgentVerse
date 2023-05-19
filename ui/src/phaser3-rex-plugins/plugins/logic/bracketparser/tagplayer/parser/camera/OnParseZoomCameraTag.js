var OnParseZoomCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser
        .on(`+${tagName}`, function (value) {
            tagPlayer.targetCamera.setZoom(value);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            tagPlayer.targetCamera.zoomTo(value, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseZoomCameraTag;