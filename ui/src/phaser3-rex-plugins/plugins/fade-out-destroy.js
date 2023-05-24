import Fade from './fade.js';

var FadeOutDestroy = function (gameObject, duration, destroyMode, fade) {
    if (destroyMode instanceof Fade) {
        fade = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = true;
    }

    var config = {
        mode: (destroyMode) ? 1 : 0,
        end: 0,
        duration: duration,
    }

    if (fade === undefined) {
        fade = new Fade(gameObject, config);
    } else {
        fade.resetFromJSON(config);
    }
    fade.restart();

    return fade;
};

export default FadeOutDestroy;