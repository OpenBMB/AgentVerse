import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseFadeInSoundEffectTag = function (textPlayer, parser, config) {
    var tagName = 'se.fadein'
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeInSoundEffect,   // callback
                time,                // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.fadein'
    parser
        .on(`+${tagName}`, function (time) {
            AppendCommandBase.call(textPlayer,
                tagName,             // name
                FadeInSoundEffect2,  // callback
                time,                // params
                textPlayer,          // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var FadeInSoundEffect = function (time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect(time);
}

var FadeInSoundEffect2 = function (time) {
    // this: textPlayer
    this.soundManager.fadeInSoundEffect2(time);
}

export default OnParseFadeInSoundEffectTag;