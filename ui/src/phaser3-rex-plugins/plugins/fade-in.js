import Fade from './fade.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var FadeIn = function (gameObject, duration, alpha, fade) {
    var startAlpha, endAlpha;
    if (IsPlainObject(alpha)) {
        startAlpha = alpha.start;
        endAlpha = alpha.end;
    } else {
        endAlpha = alpha;
    }
    if (startAlpha === undefined) {
        startAlpha = 0
    }
    if (endAlpha === undefined) {
        endAlpha = 1;
    }

    var config = {
        mode: 0,
        start: startAlpha,
        end: endAlpha,
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

export default FadeIn;