import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeOutBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                tagName,                 // name
                FadeOutBackgroundMusic,  // callback
                [time, isStopped],       // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            AppendCommandBase.call(textPlayer,
                tagName,                 // name
                FadeOutBackgroundMusic2, // callback
                [time, isStopped],       // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeOutBackgroundMusic = function (params) {
    // this: textPlayer
    this.soundManager.fadeOutBackgroundMusic(...params);
}

var FadeOutBackgroundMusic2 = function (params) {
    // this: textPlayer
    this.soundManager.fadeOutBackgroundMusic2(...params);
}

export default OnParseFadeOutBackgroundMusicTag;