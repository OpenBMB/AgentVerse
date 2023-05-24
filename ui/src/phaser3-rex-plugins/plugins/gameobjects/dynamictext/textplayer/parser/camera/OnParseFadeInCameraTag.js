import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeInCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.fadein';
    parser
        .on(`+${tagName}`, function (duration, red, green, blue) {
            AppendCommandBase.call(textPlayer,
                tagName,                       // name
                PlayFadeInEffect,              // callback
                [duration, red, green, blue],  // params
                textPlayer,                    // scope
            );
            parser.skipEvent();
        })
}

var PlayFadeInEffect = function (params) {
    // this: textPlayer
    this.targetCamera.fadeIn(...params);
}

export default OnParseFadeInCameraTag;