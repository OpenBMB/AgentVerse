import {
    Show,
    Hide,
    IsShown,
} from '../utils/Hide.js';

export default {
    show(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Show(gameObject, false);
        return this;
    },

    hide(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        Hide(gameObject, true);
        return this;
    },

    isShow(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return IsShown(gameObject);
    }
}