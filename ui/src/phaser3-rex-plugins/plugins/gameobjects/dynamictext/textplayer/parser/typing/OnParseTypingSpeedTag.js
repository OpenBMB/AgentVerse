import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseTypingSpeedTag = function (textPlayer, parser, config) {
    var tagName = 'speed';
    parser
        .on(`+${tagName}`, function (speed) {
            AppendCommand(textPlayer, speed);
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommand(textPlayer, undefined);
            parser.skipEvent();
        })
}

var SetTypingSpeed = function (speed) {
    this.typeWriter.setTypingSpeed(speed);  // this: textPlayer
}

var AppendCommand = function (textPlayer, speed) {
    AppendCommandBase.call(textPlayer,
        'speed',         // name
        SetTypingSpeed,  // callback
        speed,           // params
        textPlayer,      // scope
    );
}

export default OnParseTypingSpeedTag;