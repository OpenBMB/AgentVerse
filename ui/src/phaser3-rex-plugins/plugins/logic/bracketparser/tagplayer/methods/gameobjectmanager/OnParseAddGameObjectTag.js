var IsAddGameObjectTag = function (tags, goType) {
    // goType.name
    return (tags.length === 2) && (tags[0] === goType)
}

var OnParseAddGameObjectTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on('+', function (tag, ...args) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name=key,frame], or [goType.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, goType)) {
                name = tags[1];                
            } else {
                return;
            }
            gameObjectManager.add(name, ...args);

            parser.skipEvent();
        })
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType.name]
            var tags = tag.split('.');
            var name;
            if (IsAddGameObjectTag(tags, goType)) {
                name = tags[1];                
            } else {
                return;
            }
            gameObjectManager.remove(name);

            parser.skipEvent();
        })
}

export default OnParseAddGameObjectTag;