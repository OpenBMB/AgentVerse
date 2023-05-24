import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseZoomCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.zoom';
    parser
        .on(`+${tagName}`, function (value) {
            AppendCommandBase.call(textPlayer,
                tagName,         // name
                Zoom,            // callback
                value,           // params
                textPlayer,      // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            AppendCommandBase.call(textPlayer,
                'camera.zoom.to',         // name
                ZoomTo,                   // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var Zoom = function (value) {
    // this: textPlayer
    this.targetCamera.setZoom(value);
}

var ZoomTo = function (params) {
    // this: textPlayer
    this.targetCamera.zoomTo(...params);
}

export default OnParseZoomCameraTag;