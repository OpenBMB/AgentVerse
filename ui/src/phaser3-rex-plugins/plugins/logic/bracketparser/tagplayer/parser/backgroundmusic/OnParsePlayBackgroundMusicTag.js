var OnParsePlayBackgroundMusicTag = function (tagPlayer, parser, config) {
    var tagName = 'bgm';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            tagPlayer.soundManager.playBackgroundMusic(name);
            if (fadeInTime) {
                tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            tagPlayer.soundManager.stopBackgroundMusic();

            parser.skipEvent();
        })


    var tagName = 'bgm2';
    parser
        .on(`+${tagName}`, function (name, fadeInTime) {
            tagPlayer.soundManager.playBackgroundMusic2(name);
            if (fadeInTime) {
                tagPlayer.soundManager.fadeInBackgroundMusic2(fadeInTime);
            }

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            tagPlayer.soundManager.stopBackgroundMusic2();

            parser.skipEvent();
        })
}

export default OnParsePlayBackgroundMusicTag;