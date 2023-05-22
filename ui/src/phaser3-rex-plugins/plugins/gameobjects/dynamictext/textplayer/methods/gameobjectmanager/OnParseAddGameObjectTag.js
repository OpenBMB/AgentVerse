import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsAddGameObjectTag = function (tags, goType) {
    // goType.name
    return (tags.length === 2) && (tags[0] === goType)
}

var OnParseAddGameObjectTag = function (textPlayer, parser, config) {
    var goType = config.name;
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

            AppendCommandBase.call(textPlayer,
                `${goType}.add`,          // name
                AddGameObject,            // callback
                [goType, name, ...args],  // params
                textPlayer,               // scope
            );

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

            AppendCommandBase.call(textPlayer,
                `${goType}.remove`, // name
                RemoveGameObject,   // callback
                [goType, name],     // params
                textPlayer,         // scope
            );

            parser.skipEvent();
        })
}

var AddGameObject = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.add(...args);
}

var RemoveGameObject = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.remove(...args);
}

export default OnParseAddGameObjectTag;