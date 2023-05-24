import Scale from './Scale.js';

var PopUp = function (gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
        ease = 'Cubic';
    }

    // Ease scale from 0 to current scale
    var start, end;
    switch (orientation) {
        case 0:
        case 'x':
            start = { x: 0 };
            end = { x: gameObject.scaleX };
            break;
        case 1:
        case 'y':
            start = { y: 0 };
            end = { y: gameObject.scaleY };
            break;
        default:
            start = 0;
            end = gameObject.scale;
            break;
    }

    var config = {
        mode: 0,
        start: start,
        end: end,
        duration: duration,
        ease: ease
    }

    if (scale === undefined) {
        scale = new Scale(gameObject, config);
    } else {
        scale.resetFromJSON(config);
    }
    scale.restart();

    return scale;
};

export default PopUp;