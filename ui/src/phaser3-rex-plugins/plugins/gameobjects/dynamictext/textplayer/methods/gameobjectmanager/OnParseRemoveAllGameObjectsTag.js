import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var OnParseRemoveAllGameObjectsTag = function (textPlayer, parser, config) {
    var goType = config.name;
    parser
        .on('-', function (tag) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [/goType]
            if (tag === goType) {
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.removeall`,   // name
                RemoveAllSprites,        // callback
                goType,                  // params
                textPlayer,              // scope
            );
            parser.skipEvent();
        })
}

var RemoveAllSprites = function (goType) {
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.removeAll();
}

export default OnParseRemoveAllGameObjectsTag;