var OnParseSetBackgroundMusicVolumeTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            tagPlayer.soundManager.setBackgroundMusicVolume(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            tagPlayer.soundManager.setBackgroundMusicVolume2(volume);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetBackgroundMusicVolumeTag;