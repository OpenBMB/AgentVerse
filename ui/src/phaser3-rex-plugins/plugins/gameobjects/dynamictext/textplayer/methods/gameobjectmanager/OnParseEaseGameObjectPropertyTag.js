import AppendCommandBase from '../../../dynamictext/methods/AppendCommand.js';

var EaseMode = {
    to: true, yoyo: true, from: true,
    toLeft: true, toRight: true, toUp: true, toDown: true,
    yoyoLeft: true, yoyoRight: true, yoyoUp: true, yoyoDown: true,
    fromLeft: true, fromRight: true, fromUp: true, fromDown: true,
}
var IsEasePropertyTag = function (tags, goType) {
    // goType.name.prop.to
    return (tags.length === 4) && (tags[0] === goType) && EaseMode[tags[3]];
}

var OnParseEaseGameObjectPropertyTag = function (textPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.prop.to=value,duration]
            // [goType.name.prop.to=value,duration,ease,repeat]
            // [goType.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, easeMode;
            if (IsEasePropertyTag(tags, goType)) {
                name = tags[1];
                property = tags[2];
                easeMode = tags[3];
            } else {
                return;
            }

            if (typeof (ease) === 'number') {
                repeat = ease;
                ease = undefined;
            }

            AppendCommandBase.call(textPlayer,
                `${goType}.ease`,                    // name
                EaseProperty,                        // callback
                [
                    goType,
                    name, property, value,
                    duration, ease, repeat, easeMode
                ],                                    // params
                textPlayer,                           // scope
            );

            parser.skipEvent();
        })
}

var EaseProperty = function (params) {
    var goType, name, property, value, duration, ease, repeat, easeMode;
    [
        goType,
        name, property, value,
        duration, ease, repeat, easeMode
    ] = params;
    // this: textPlayer
    var gameObjectManager = this.getGameObjectManager(goType);

    var currentValue = gameObjectManager.getProperty(name, property);
    // Only can tween number property
    if (typeof (currentValue) !== 'number') {
        return;
    }

    if (easeMode.endsWith('Left') || easeMode.endsWith('Up')) {
        if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
            value = currentValue - value;
        } else if (easeMode.startsWith('from')) {
            gameObjectManager.setProperty(name, property, (currentValue - value));
            value = currentValue;
        }
    } else if (easeMode.endsWith('Right') || easeMode.endsWith('Down')) {
        if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
            value = currentValue + value;
        } else if (easeMode.startsWith('from')) {
            gameObjectManager.setProperty(name, property, (currentValue + value));
            value = currentValue;
        }
    } else if (easeMode === 'from') {
        gameObjectManager.setProperty(name, property, value);
        value = currentValue;
    }

    var isYoyo = easeMode.startsWith('yoyo');

    gameObjectManager.easeProperty(
        name, property, value,
        duration, ease, repeat, isYoyo
    );
}

export default OnParseEaseGameObjectPropertyTag;