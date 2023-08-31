import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseWaitTag = function (textPlayer, parser, config) {
    var tagWait = 'wait';
    var tagClick = 'click';
    parser
        .on(`+${tagWait}`, function (name) {
            AppendCommand(textPlayer, name);
            parser.skipEvent();
        })
        .on(`-${tagWait}`, function () {
            parser.skipEvent();
        })
        .on(`+${tagClick}`, function () {  // Equal to [wait=click]
            AppendCommand(textPlayer, 'click');
            parser.skipEvent();
        })
        .on(`-${tagClick}`, function () {  // Equal to [/wait]
            parser.skipEvent();
        })
}

var Wait = function (name) {
    this.typeWriter.wait(name);  // this: textPlayer
}

var AppendCommand = function (textPlayer, name) {
    AppendCommandBase.call(textPlayer,
        'wait',       // name
        Wait,         // callback
        name,         // params
        textPlayer,   // scope
    );
}

export default OnParseWaitTag;