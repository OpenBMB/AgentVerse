import ClickOutside from '../clickoutside/ClickOutside.js';

export default {
    onClickOutside(gameObject, callback, scope, config) {
        if (!gameObject) {
            return this;
        }

        if (typeof (gameObject) === 'function') {
            config = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            gameObject._clickOutside = new ClickOutside(gameObject, config);
        }
        gameObject._clickOutside.on('clickoutside', callback, scope);

        return this;
    },

    offClickOutside(gameObject, callback, scope) {
        if (typeof (gameObject) === 'function') {
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.off('clickoutside', callback, scope);

        return this;
    },

    enableClickOutside(gameObject, enabled) {
        if (gameObject && typeof (gameObject) !== 'object') {
            enabled = gameObject;
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.setEnable(enabled);

        return this;
    },

    disableClickOutside(gameObject) {
        if (gameObject && typeof (gameObject) !== 'object') {
            gameObject = this;
        }

        if (gameObject._clickOutside === undefined) {
            return this;
        }
        gameObject._clickOutside.setEnable(false);

        return this;
    }
}