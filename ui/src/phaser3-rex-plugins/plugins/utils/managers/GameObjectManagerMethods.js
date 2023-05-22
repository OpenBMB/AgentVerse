import GameObjectManagerBase from '../gameobject/gomanager/GOManager.js';

export default {
    addGameObjectManager(config, GameObjectManagerClass) {
        if (config === undefined) {
            config = {};
        }
        if (GameObjectManagerClass === undefined) {
            GameObjectManagerClass = GameObjectManagerBase;
        }

        if (!config.createGameObjectScope) {
            config.createGameObjectScope = this;
        }
        var gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
        this.gameObjectManagers[config.name] = gameobjectManager;

        return this;
    },

    getGameObjectManager(managerName, gameObjectName) {
        if (managerName) {
            var manager = this.gameObjectManagers[managerName]
            return manager;
        } else {
            for (var managerName in this.gameObjectManagers) {
                var manager = this.gameObjectManagers[managerName]
                if (manager.has(gameObjectName)) {
                    return manager;
                }
            }
        }
    },

    getGameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    },

    getGameObjectManagerName(gameObjectName) {
        for (var managerName in this.gameObjectManagers) {
            if (this.gameObjectManagers[managerName].has(gameObjectName)) {
                return managerName;
            }
        }
    },
}