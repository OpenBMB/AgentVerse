var OnParseFadeOutSoundEffectTag = function (tagPlayer, parser, config) {
    var tagName = 'se.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'se2.fadeout';
    parser
        .on(`+${tagName}`, function (time, isStopped) {
            isStopped = (isStopped === 'stop');
            tagPlayer.soundManager.fadeOutSoundEffect2(time, isStopped);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeOutSoundEffectTag;