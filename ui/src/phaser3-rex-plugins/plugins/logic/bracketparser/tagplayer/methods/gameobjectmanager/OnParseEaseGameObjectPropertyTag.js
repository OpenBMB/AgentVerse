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

var OnParseEaseGameObjectPropertyTag = function (tagPlayer, parser, config) {
    var goType = config.name;
    var gameObjectManager = tagPlayer.getGameObjectManager(goType);
    parser
        .on(`+`, function (tag, value, duration, ease, repeat) {
            if (parser.skipEventFlag) {  // Has been processed before
                return;
            }

            // [goType.name.prop.to=value,duration]
            // [goType.name.prop.to=value,duration,ease,repeat]
            // [goType.name.prop.to=value,duration,repeat]
            var tags = tag.split('.');
            var name, property, currentValue, easeMode;
            if (IsEasePropertyTag(tags, goType)) {
                name = tags[1];
                property = tags[2];
                currentValue = gameObjectManager.getProperty(name, property);
                // Only can tween number property
                if (typeof (currentValue) !== 'number') {
                    return;
                }

                easeMode = tags[3];
            } else {
                return;
            }

            if (typeof (ease) === 'number') {
                repeat = ease;
                ease = undefined;
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

            parser.skipEvent();
        })
}

export default OnParseEaseGameObjectPropertyTag;