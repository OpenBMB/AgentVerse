var GetLocalStates = function (gameObjects) {
    var localStates = []
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (!gameObject.hasOwnProperty('rexContainer')) {
            continue;
        }
        localStates.push(gameObject.rexContainer);
    }
    return localStates;
}

var GetScene = function (gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var scene = gameObjects[i].scene;
        if (scene) {
            return scene;
        }
    }
    return null;
}

var UpdateChild = function (tween, key, target) {
    if (!target.parent) {
        // target object was removed, so remove this tween too
        tween.remove();
        return;
    }

    var parent = target.parent;
    var child = target.self;
    switch (key) {
        case 'x':
        case 'y':
            parent.updateChildPosition(child);
            break;

        case 'angle':
        case 'rotation':
            parent.updateChildRotation(child);
            break;

        case 'scaleX':
        case 'scaleY':        
        case 'displayWidth':
        case 'displayHeight':
            parent.updateChildScale(child);
            break;

        case 'alpha':
            parent.updateChildAlpha(child);
            break;

        default:
            parent.updateChildPosition(child);
            parent.updateChildRotation(child);
            parent.updateChildScale(child);
            parent.updateChildAlpha(child);
            break;
    }
};

export default {
    tweenChild(tweenConfig) {
        var targets = tweenConfig.targets;
        if (!Array.isArray(targets)) {
            targets = [targets];
        }

        var scene = this.scene || GetScene(targets);
        if (!scene) {
            return;
        }

        // Map child game objects to local states
        tweenConfig.targets = GetLocalStates(targets);
        var tween = scene.tweens.add(tweenConfig);

        // Update child game object in 'update' event
        tween.on('update', UpdateChild);

        return tween;
    },

    tweenSelf(tweenConfig) {
        tweenConfig.targets = [this];
        return this.tweenChild(tweenConfig);
    },

    createTweenChildConfig(tweenConfig) {
        var targets = tweenConfig.targets;
        if (targets) {
            if (!Array.isArray(targets)) {
                targets = [targets];
            }
            // Map child game objects to local states
            tweenConfig.targets = GetLocalStates(targets);
        }

        var onUpdate = tweenConfig.onUpdate;
        tweenConfig.onUpdate = function (tween, target) {
            if (onUpdate) {
                onUpdate(tween, target);
            }
            UpdateChild(tween, undefined, target);
        }

        return tweenConfig;
    },

    tween(tweenConfig) {
        var scene = this.scene;
        if (!tweenConfig.targets) {
            tweenConfig.targets = this;
        }
        return scene.tweens.add(tweenConfig);
    },
}