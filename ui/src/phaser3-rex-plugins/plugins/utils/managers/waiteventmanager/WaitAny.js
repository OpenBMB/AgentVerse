var WaitAny = function (config) {
    if (!config) {
        return this.waitTime(0);
    }

    var hasAnyWaitEvent = false;
    for (var name in config) {
        switch (name) {
            case 'time':
                hasAnyWaitEvent = true;
                this.waitTime(config.time);
                break;

            case 'click':
                hasAnyWaitEvent = true;
                this.waitClick(config.key);
                break;


            case 'key':
                hasAnyWaitEvent = true;
                this.waitKeyDown(config.key);
                break;

            case 'camera':
                hasAnyWaitEvent = true;
                this.waitCameraEffectComplete(config.camera);
                break;

            case 'bgm':
                hasAnyWaitEvent = true;
                this.waitBackgroundMusicComplete();
                break;

            case 'bgm2':
                hasAnyWaitEvent = true;
                this.waitBackgroundMusic2Complete();
                break;

            case 'se':
                hasAnyWaitEvent = true;
                this.waitSoundEffectComplete();
                break;

            case 'se2':
                hasAnyWaitEvent = true;
                this.waitSoundEffect2Complete();
                break;

            default:
                var names = name.split('.');
                if (names.length === 2) {
                    var gameObjectName = names[0];
                    var propName = names[1];
                    var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
                    if (!gameObjectManager) {
                        continue;
                    }

                    var value = gameObjectManager.getProperty(gameObjectName, propName);
                    if (typeof (value) === 'number') {
                        hasAnyWaitEvent = true;
                        this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
                        continue;

                    }

                    var dataKey = propName;
                    var matchFalseFlag = dataKey.startsWith('!');
                    if (matchFalseFlag) {
                        dataKey = dataKey.substring(1);
                    }
                    if (gameObjectManager.hasData(gameObjectName, propName)) {
                        hasAnyWaitEvent = true;
                        this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
                    }
                }
                break;

        }
    }

    if (!hasAnyWaitEvent) {
        this.waitTime(0);
    }

    return this.parent;
}

export default WaitAny;