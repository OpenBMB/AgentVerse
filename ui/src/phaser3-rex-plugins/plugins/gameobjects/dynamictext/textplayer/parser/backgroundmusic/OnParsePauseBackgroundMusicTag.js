import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParsePauseBackgroundMusicTag = function (textPlayer, parser, config) {
    var tagName = 'bgm.pause';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                PauseBackgroundMusic,  // callback
                undefined,             // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm.resume',           // name
                ResumeBackgroundMusic,  // callback
                undefined,              // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })


    var tagName = 'bgm2.pause';
    parser
        .on(`+${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                PauseBackgroundMusic2, // callback
                undefined,             // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            AppendCommandBase.call(textPlayer,
                'bgm2.resume',          // name
                ResumeBackgroundMusic2, // callback
                undefined,              // params
                textPlayer,             // scope
            );
            parser.skipEvent();
        })
}

var PauseBackgroundMusic = function () {
    // this: textPlayer
    this.soundManager.pauseBackgroundMusic();
}

var ResumeBackgroundMusic = function () {
    // this: textPlayer
    this.soundManager.resumeBackgroundMusic();
}

var PauseBackgroundMusic2 = function () {
    // this: textPlayer
    this.soundManager.pauseBackgroundMusic2();
}

var ResumeBackgroundMusic2 = function () {
    // this: textPlayer
    this.soundManager.resumeBackgroundMusic2();
}

export default OnParsePauseBackgroundMusicTag;