import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseCrossFadeBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                CrossFadeBackgroundMusic,  // callback
                [name, fadeTime],          // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.cross';
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            AppendCommandBase.call(textPlayer,
                tagName,                   // name
                CrossFadeBackgroundMusic2, // callback
                [name, fadeTime],          // params
                textPlayer,                // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var CrossFadeBackgroundMusic = function (params) {
    // this: textPlayer
    this.soundManager.crossFadeBackgroundMusic(...params);
}

var CrossFadeBackgroundMusic2 = function (params) {
    // this: textPlayer
    this.soundManager.crossFadeBackgroundMusic2(...params);
}

export default OnParseCrossFadeBackgroundMusicTag;