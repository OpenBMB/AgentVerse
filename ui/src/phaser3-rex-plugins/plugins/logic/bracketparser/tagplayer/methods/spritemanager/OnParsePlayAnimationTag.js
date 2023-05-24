var IsPlayAnimationTag = function (tags, goType) {
    // goType.name.play
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'play');
}

var IsStopAnimationTag = function (tags, goType) {
    // goType.name.stop
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'stop');
}

var OnParsePlayAnimationTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.play=key], or [goType.name.play=key0,key1,...]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }
            var keys = Array.prototype.slice.call(arguments, 1);
            var firstKey = keys.shift();
            gameObjectManager.playAnimation(name, firstKey);
            if (keys.length > 0) {
                gameObjectManager.chainAnimation(name, keys);
            }

            parser.skipEvent();
        })
        .on('+', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.stop]
            var tags = tag.split('.');
            var name;
            if (IsStopAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }
            gameObjectManager.stopAnimation(name);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType.name.play]
            var tags = tag.split('.');
            var name;
            if (IsPlayAnimationTag(tags, goType)) {
                name = tags[1];
            } else {
                return;
            }
            gameObjectManager.stopAnimation(name);

            parser.skipEvent();
        })
}

export default OnParsePlayAnimationTag;