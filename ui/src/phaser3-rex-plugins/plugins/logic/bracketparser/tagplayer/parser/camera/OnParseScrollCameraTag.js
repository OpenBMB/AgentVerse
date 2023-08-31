var OnParseScrollCameraTag = function (tagPlayer, parser, config) {
    var tagName = 'camera.scroll';
    parser
        .on(`+${tagName}`, function (x, y) {
            tagPlayer.targetCamera.setScroll(x, y);

            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (x, y, duration, ease) {
            // this: tagPlayer
            var camera = tagPlayer.targetCamera;
            var xSave = camera.scrollX;
            var ySave = camera.scrollY;
            camera.setScroll(x, y);
            x += camera.centerX;
            y += camera.centerY;
            camera.setScroll(xSave, ySave);

            // x,y in pan() is the centerX, centerY
            camera.pan(x, y, duration, ease);

            parser.skipEvent();
        })
}

export default OnParseScrollCameraTag;