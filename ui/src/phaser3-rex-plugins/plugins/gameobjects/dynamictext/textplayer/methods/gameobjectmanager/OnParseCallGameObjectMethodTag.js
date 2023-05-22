import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsPropTag = function (tags, goType) {
    // goType.name.prop
    return (tags.length === 3) && (tags[0] === goType);
}

var OnParseCallGameObjectMethodTag = function (textPlayer, parser, config) {
    var goType = config.name;
    parser
        .on(`+`, function (tag, ...parameters) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.methodName=value0,value1,value2...]
            // [goType.name.prop=value]
            var tags = tag.split('.');
            var name, prop;
            if (IsPropTag(tags, goType)) {
                name = tags[1];
                prop = tags[2];
            } else {
                return;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.call`,                    // name
                CallMethod,                          // callback
                [goType, name, prop, ...parameters], // params
                textPlayer,                          // scope
            );

            parser.skipEvent();
        })
}

var CallMethod = function (params) {
    var goType, name, prop, args;
    [goType, name, prop, ...args] = params;
    // this: textPlayer

    var eventName = `${goType}.${prop}`;
    this.emit(
        eventName,
        name, ...args
    );
    if (this.listenerCount(eventName) > 0) {
        return;
    }

    var gameObjectManager = this.getGameObjectManager(goType);
    if (gameObjectManager.hasMethod(name, prop)) {
        // Is method
        gameObjectManager.call(name, prop, ...args);
    } else {
        // Is property
        gameObjectManager.setProperty(name, prop, args[0]);
    }

}

export default OnParseCallGameObjectMethodTag;