var OnParseFadeInBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm.fadein';
    parser
        .on(`+${tagName}`, function (time) {
            tagPlayer.soundManager.fadeInBackgroundMusic(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })


    var tagName = 'bgm2.fadein';
    parser
        .on(`+${tagName}`, function (time) {
            tagPlayer.soundManager.fadeInBackgroundMusic2(time);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseFadeInBackgroundMusicTag;