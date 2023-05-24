import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeOutCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.fadeout';
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                tagName,                       // name
                PlayFadeOutEffect,             // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeOutEffect = function (params) {
    // this: textPlayer
    this.targetCamera.fadeOut(...params);
}

export default OnParseFadeOutCameraTag;