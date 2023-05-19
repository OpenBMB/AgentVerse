import EaseMove from './behaviors/easemove/EaseMove.js';
import EaseMoveTo from './behaviors/easemove/EaseMoveTo.js';
import EaseMoveFrom from './behaviors/easemove/EaseMoveFrom.js';

var EaseMoveToDestroy = function (gameObject, duration, endX, endY, ease, easeMove) {
    return EaseMoveTo(gameObject, duration, endX, endY, ease, true, easeMove);
}

var EaseMoveFromDestroy = function (gameObject, duration, startX, startY, ease, easeMove) {
    return EaseMoveFrom(gameObject, duration, startX, startY, ease, true, easeMove);
}

export {
    EaseMove,
    EaseMoveTo, EaseMoveToDestroy,
    EaseMoveFrom, EaseMoveFromDestroy
};