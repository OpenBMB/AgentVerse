export default {
    createGameObject(goType, name, ...params) {
        this.getGameObjectManager(goType, name).add(name, ...params);
        return this;
    },

    destroyGameObject(goType, name) {
        var gameObjectManager = this.getGameObjectManager(goType, name);
        if (name === undefined) {
            gameObjectManager.removeAll();
        } else {
            gameObjectManager.remove(name);
        }
        return this;
    },

    callGameObjectMethod(goType, name, methodName, ...params) {
        this.getGameObjectManager(goType, name).call(name, methodName, ...params);
        return this;
    },

    setGameObjectProperty(goType, name, prop, value) {
        this.getGameObjectManager(goType, name).setProperty(name, prop, value);
        return this;
    },

    easeGameObjectProperty(goType, name, prop, value, duration, ease, repeat, isYoyo) {
        this.getGameObjectManager(goType, name).easeProperty(
            name, prop, value,
            duration, ease, repeat, isYoyo
        );
        return this;
    },

    getGameObjectTweenTask(goType, name, property) {
        return this.getGameObjectManager(goType, name).getTweenTask(name, property);
    },

    getGameObject(goType, name, out) {
        var gameobjectManager = this.getGameObjectManager(goType, name);
        if (typeof (name) === 'string') {
            return gameobjectManager.getGO(name);
        } else {
            var names = name;
            if (names === undefined) {
                names = gameobjectManager.bobs;
            }
            if (out === undefined) {
                out = {};
            }
            for (name in names) {
                out[name] = gameobjectManager.getGO(name);
            }
            return out;
        }
    },

    addGameObject(goType, name, gameObject) {
        var gameobjectManager = this.getGameObjectManager(goType, name);
        if (typeof (name) === 'string') {
            gameobjectManager.addGO(name, gameObject);
        } else {
            var names = name;
            for (name in names) {
                gameobjectManager.addGO(name, names[name]);
            }
        }
        return this;
    },

    drawGameObjectsBounds(goTypes, graphics, config) {
        if (goTypes instanceof Phaser.GameObjects.Graphics) {
            config = graphics;
            graphics = goTypes;
            goTypes = undefined;
        }

        if (goTypes === undefined) {
            goTypes = this.getGameObjectManagerNames();
        }

        if (!Array.isArray(goTypes)) {
            goTypes = [goTypes];
        }
        for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
            this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config)
        }

        return this;
    }

}