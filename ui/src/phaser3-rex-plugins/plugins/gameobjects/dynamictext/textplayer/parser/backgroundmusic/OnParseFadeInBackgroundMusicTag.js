import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeInBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                tagName,                 // name
                FadeInBackgroundMusic,   // callback
                time,                    // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.fadein';
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                tagName,                 // name
                FadeInBackgroundMusic2,  // callback
                time,                    // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInBackgroundMusic = function (time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic(time);
}

var FadeInBackgroundMusic2 = function (time) {
    // this: textPlayer
    this.soundManager.fadeInBackgroundMusic2(time);
}

export default OnParseFadeInBackgroundMusicTag;