import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseSetSoundEffectVolumeTag = function (textPlayer, parser, config) {
    var tagName = 'se.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                SetSoundEffectVolume,  // callback
                volume,                // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            AppendCommandBase.call(textPlayer,
                tagName,               // name
                SetSoundEffectVolume2,  // callback
                volume,                // params
                textPlayer,            // scope
            );
            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

var SetSoundEffectVolume = function (volume) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume(volume, true);
}

var SetSoundEffectVolume2 = function (volume) {
    // this: textPlayer
    this.soundManager.setSoundEffectVolume2(volume, true);
}
export default OnParseSetSoundEffectVolumeTag;