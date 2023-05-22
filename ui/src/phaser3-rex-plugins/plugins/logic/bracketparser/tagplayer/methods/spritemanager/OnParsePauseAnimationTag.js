var IsPauseAnimationTag = function (tags, goType) {
    // goType.name.pause 
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'pause');
}

var OnParsePauseAnimationTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.pause=key]
            var tags = tag.split('.');
            var name;
            if (IsPauseAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }
            gameObjectManager.pauseAnimation(name);

            parser.skipEvent();
        })
}

export default OnParsePauseAnimationTag;