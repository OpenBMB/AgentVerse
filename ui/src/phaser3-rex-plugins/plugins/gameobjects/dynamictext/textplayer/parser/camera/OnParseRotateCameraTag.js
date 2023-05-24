import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

const DegToRad = Phaser.Math.DegToRad;

var OnParseRotateCameraTag = function (textPlayer, parser, config) {
    var tagName = 'camera.rotate';
    parser
        .on(`+${tagName}`, function (value) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                tagName,          // name
                Rotate,           // callback
                value,            // params
                textPlayer,       // scope
            );
            parser.skipEvent();
        })
        .on(`+${tagName}.to`, function (value, duration, ease) {
            value = DegToRad(value);
            AppendCommandBase.call(textPlayer,
                'camera.rotate.to',       // name
                RotateTo,                 // callback
                [value, duration, ease],  // params
                textPlayer,               // scope
            );
            parser.skipEvent();
        })
}

var Rotate = function (value) {
    // this: textPlayer
    this.targetCamera.setRotation(value);
}

var RotateTo = function (params) {
    var value = params[0];
    var duration = params[1];
    var ease = params[2];

    // this: textPlayer
    this.targetCamera.rotateTo(value, false, duration, ease);
}

export default OnParseRotateCameraTag;