import EaseMove from './EaseMove.js';
import ParseValue from './ParseValue.js';

var EaseMoveTo = function (gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    var config = {};
    config.mode = (destroyMode) ? 1 : 0;
    if (endX !== undefined) {
        config.startX = gameObject.x;
        config.endX = ParseValue(endX, gameObject.x);
    }
    if (endY !== undefined) {
        config.startY = gameObject.y;
        config.endY = ParseValue(endY, gameObject.y);
    }
    config.duration = duration;
    config.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, config);
    } else {
        easeMove.resetFromJSON(config);
    }
    easeMove.restart();

    return easeMove;
};

export default EaseMoveTo;