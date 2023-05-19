import EaseMove from './EaseMove.js';
import ParseValue from './ParseValue.js';

var EaseMoveFrom = function (gameObject, duration, startX, startY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    var config = {};
    config.mode = (destroyMode) ? 1 : 0;
    if (startX !== undefined) {
        config.startX = ParseValue(startX, gameObject.x);
        config.endX = gameObject.x;
    }
    if (startY !== undefined) {
        config.startY = ParseValue(startY, gameObject.y);
        config.endY = gameObject.y;
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
}

export default EaseMoveFrom;