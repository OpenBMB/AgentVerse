var OnParseCrossFadeBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm.cross';
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.cross';
    parser
        .on(`+${tagName}`, function (name, fadeTime) {
            tagPlayer.soundManager.crossFadeBackgroundMusic2(name, fadeTime);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseCrossFadeBackgroundMusicTag;