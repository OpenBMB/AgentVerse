import Scale from './Scale.js';

var Yoyo = function (gameObject, duration, peakValue, repeat, orientation, ease, scale) {
    if (peakValue === undefined) {
        peakValue = 1.2;
    }
    if (repeat === undefined) {
        repeat = 0;
    }
    if (ease === undefined) {
        ease = 'Cubic';
    }

    // Ease scale from 0 to current scale
    var start, end;
    switch (orientation) {
        case 0:
        case 'x':
            start = { x: gameObject.scaleX };
            end = { x: peakValue };
            break;
        case 1:
        case 'y':
            start = { y: gameObject.scaleX };
            end = { y: peakValue };
            break;
        default:
            start = gameObject.scaleX;
            end = peakValue;
            break;
    }

    var config = {
        mode: 2,
        start: start,
        end: end,
        duration: (duration / 2),
        ease: ease,
        repeat: repeat,
    }

    if (scale === undefined) {
        scale = new Scale(gameObject, config);
    } else {
        scale.resetFromJSON(config);
    }
    scale.restart();

    return scale;
};

export default Yoyo;