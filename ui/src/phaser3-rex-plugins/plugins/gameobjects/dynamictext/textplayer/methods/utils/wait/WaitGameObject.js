import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitGameObject = function (textPlayer, name) {
    var names = name.split('.');
    return textPlayer.gameObjectManagers.hasOwnProperty(names[0]);
}

var WaitGameObject = function (textPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
    var tags = tag.split('.');
    var goType = tags[0];
    var gameObjectManager = textPlayer.getGameObjectManager(goType);
    var waitEventName = `wait.${goType}`
    switch (tags.length) {
        case 1:  // 'goType' : wait all sprites has beeen destroyed
            if (gameObjectManager.isEmpty) {
                textPlayer.emit(waitEventName);
                wrapCallback();
            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    gameObjectManager.off('empty', wrapCallback, textPlayer);
                });
                gameObjectManager.once('empty', wrapCallback, textPlayer);
                textPlayer.emit(waitEventName);
            }
            return;

        case 2:  // 'goType.name' : wait goType.name has been destroyed
            var name = tags[1];
            if (!gameObjectManager.has(name)) {
                textPlayer.emit(waitEventName, name);
                wrapCallback();
            } else {
                var spriteData = gameObjectManager.get(name);
                var gameObject = spriteData.gameObject;
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function () {
                    gameObject.off('destroy', wrapCallback, textPlayer);
                });

                gameObject.once('destroy', wrapCallback, textPlayer);
                textPlayer.emit(waitEventName, name);
            }
            return;

        case 3:  // 'goType.name.prop' : wait ease goType.name.prop has been completed
            var name = tags[1],
                prop = tags[2];

            var value = gameObjectManager.getProperty(name, prop);
            // Can start tween task for a number property
            if (typeof (value) === 'number') {
                var task = gameObjectManager.getTweenTask(name, prop);
                if (!task) {
                    textPlayer.emit(waitEventName, name, prop);
                    wrapCallback();
                } else {
                    // Remove all wait events
                    textPlayer.once(RemoveWaitEvents, function () {
                        task.off('complete', wrapCallback, textPlayer);
                    });

                    task.once('complete', wrapCallback, textPlayer);
                    textPlayer.emit(waitEventName, name, prop);
                }
                return;
            }

            var dataKey = prop;
            var matchFalseFlag = dataKey.startsWith('!');
            if (matchFalseFlag) {
                dataKey = dataKey.substring(1);
            }
            // Wait until flag is true/false
            if (gameObjectManager.hasData(name, dataKey)) {
                var gameObject = gameObjectManager.getGO(name);
                var flag = gameObject.getData(dataKey);
                var matchTrueFlag = !matchFalseFlag;
                if (flag === matchTrueFlag) {
                    textPlayer.emit(waitEventName, name, prop);
                    wrapCallback();
                } else {
                    // Remove all wait events
                    var eventName = `changedata-${dataKey}`;
                    var callback = function (gameObject, value, previousValue) {
                        value = !!value;
                        if (value === matchTrueFlag) {
                            wrapCallback.call(textPlayer);
                        }
                    }
                    textPlayer.once(RemoveWaitEvents, function () {
                        gameObject.off(eventName, callback);
                    });

                    gameObject.on(eventName, callback);
                    textPlayer.emit(waitEventName, name, prop);
                }
                return;
            }

    }

}


export { IsWaitGameObject, WaitGameObject };