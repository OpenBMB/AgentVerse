import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParsePlaySoundEffectTag = function (textPlayer, parser, config) {
    var tagName = 'se';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlaySoundEffect,      // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            AppendCommandBase.call(textPlayer,
                tagName,              // name
                PlaySoundEffect2,      // callback
                [name, fadeInTime],   // params
                textPlayer,           // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var PlaySoundEffect = function (params) {
    if (this.skipSoundEffect) {
        return;
    }

    var name = params[0];
    var fadeInTime = params[1];

    this.soundManager.playSoundEffect(name);  // this: textPlayer
    if (fadeInTime) {
        this.soundManager.fadeInSoundEffect(fadeInTime);
    }
}

var PlaySoundEffect2 = function (params) {
    if (this.skipSoundEffect) {
        return;
    }

    var name = params[0];
    var fadeInTime = params[1];

    this.soundManager.playSoundEffect2(name);  // this: textPlayer
    if (fadeInTime) {
        this.soundManager.fadeInSoundEffect2(fadeInTime);
    }
}

export default OnParsePlaySoundEffectTag;