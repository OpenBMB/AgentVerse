import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var IsPlayAnimationTag = function (tags, goType) {
    // goType.name.play
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'play');
}

var IsStopAnimationTag = function (tags, goType) {
    // goType.name.stop
    return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'stop');
}

var OnParsePlayAnimationTag = function (textPlayer, parser, config) {
    var goType = config.name;
    parser
        .on('+', function (tag, ...keys) {
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

            AppendCommandBase.call(textPlayer,
                `${goType}.play`,       // name
                PlayAnimation,          // callback
                [goType, name, keys],   // params
                textPlayer,             // scope
            );

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

            AppendCommandBase.call(textPlayer,
                `${goType}.stop`,   // name
                StopAnimation,      // callback
                [goType, name],     // params
                textPlayer,         // scope
            );

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

            AppendCommandBase.call(textPlayer,
                `${goType}.stop`,    // name
                StopAnimation,       // callback
                [goType, name],      // params
                textPlayer,          // scope
            );

            parser.skipEvent();
        })
}

var PlayAnimation = function (params) {
    var goType, name, keys;
    [goType, name, keys] = params;
    var key = keys.shift();

    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.playAnimation(name, key);
    if (keys.length > 0) {
        gameObjectManager.chainAnimation(name, keys);
    }
}

var StopAnimation = function (params) {
    var goType, args;
    [goType, ...args] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);
    gameObjectManager.stopAnimation(...args);
}

export default OnParsePlayAnimationTag;