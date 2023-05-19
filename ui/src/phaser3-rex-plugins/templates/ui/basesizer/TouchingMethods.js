import InTouching from '../intouching/InTouching.js';
import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds.js';

export default {
    isPointerInBounds(target) {
        if (target === undefined) {
            target = this;
        } else if (typeof (target) === 'string') {
            target = this.getElement(target);
        }

        if (!target) {
            return false;
        }

        return IsPointerInBounds(target);
    },

    onTouching(gameObject, callback, scope, config) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            gameObject._inTouching = new InTouching(gameObject, config);
        }
        gameObject._inTouching.on('intouch', callback, scope);

        return this;
    },

    offTouching(gameObject, callback, scope) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.off('intouch', callback, scope);

        return this;
    },

    onTouchingEnd(gameObject, callback, scope, config) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            gameObject._inTouching = new InTouching(gameObject, config);
        }
        gameObject._inTouching.on('touchend', callback, scope);

        return this;
    },

    offTouchingEnd(gameObject, callback, scope) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.off('touchend', callback, scope);

        return this;
    },


    enableTouching(gameObject, enabled) {
        if (gameObject && typeof (gameObject) !== 'object') {
            enabled = gameObject;
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.setEnable(enabled);

        return this;
    },

    disableTouching(gameObject) {
        if (gameObject && typeof (gameObject) !== 'object') {
            gameObject = this;
        }

        if (gameObject._inTouching === undefined) {
            return this;
        }
        gameObject._inTouching.setEnable(false);

        return this;
    },


}