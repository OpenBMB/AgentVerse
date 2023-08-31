import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseShakeCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.shake';
    parser
        .on(`+${tagName}`, function (duration, intensity) {
            AppendCommandBase.call(textPlayer,
                tagName,                // name
                PlayShakeEffect,        // callback
                [duration, intensity],  // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PlayShakeEffect = function (params) {
    // this: textPlayer
    this.targetCamera.shake(...params);
}

export default OnParseShakeCameraTag;