import IsArray from '../../utils/object/IsArray.js';

export default {
    setAutoCleanupEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.autoCleanupEnable = enabled;
        return this;
    },

    addDestroyCallback(gameObject) {
        if ((!gameObject) || (!this.autoCleanupEnable)) {
            return this;
        }

        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.once('destroy', this.onChildDestroy, this);
        }
        return this;
    },

    removeDestroyCallback(gameObject) {
        if ((!gameObject) || (!this.autoCleanupEnable)) {
            return this;
        }

        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.onChildDestroy, this);
        }
        return this;
    }
}