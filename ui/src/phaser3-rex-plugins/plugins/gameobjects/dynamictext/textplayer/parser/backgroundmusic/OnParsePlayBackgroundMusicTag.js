import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParsePlayBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlayBackgroundMusic,  // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm.stop',           // name
                StopBackgroundMusic,  // callback
                undefined,            // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })


    var tagName = 'bgm2';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlayBackgroundMusic2, // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm2.stop',          // name
                StopBackgroundMusic2, // callback
                undefined,            // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
}

var PlayBackgroundMusic = function (params) {
    var name = params[0];
    var fadeInTime = params[1];

    // this: textPlayer
    this.soundManager.playBackgroundMusic(name);
    if (fadeInTime) {
        this.soundManager.fadeInBackgroundMusic(fadeInTime);
    }
}

var StopBackgroundMusic = function () {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic();
}

var PlayBackgroundMusic2 = function (params) {
    var name = params[0];
    var fadeInTime = params[1];

    // this: textPlayer
    this.soundManager.playBackgroundMusic2(name);
    if (fadeInTime) {
        this.soundManager.fadeInBackgroundMusic2(fadeInTime);
    }
}

var StopBackgroundMusic2 = function () {
    // this: textPlayer
    this.soundManager.stopBackgroundMusic2();
}

export default OnParsePlayBackgroundMusicTag;