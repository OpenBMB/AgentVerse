import GetEaseConfig from './GetEaseConfig.js';

var PopUp = function (menu, duration) {
    menu.popUp(GetEaseConfig(menu.root.easeIn, menu))
}

var ScaleDown = function (menu, duration) {
    // Don't destroy here
    menu.scaleDown(GetEaseConfig(menu.root.easeOut, menu));
}

export default {
    setTransitInCallback(callback) {
        if (callback === undefined) {
            callback = PopUp;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    },

    setTransitOutCallback(callback) {
        if (callback === undefined) {
            callback = ScaleDown;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject, duration) {}
        return this;
    }
}