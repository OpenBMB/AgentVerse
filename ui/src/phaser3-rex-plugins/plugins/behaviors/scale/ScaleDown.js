import Scale from './Scale.js';

var ScaleDown = function (gameObject, duration, orientation, ease, scale) {
    if (ease === undefined) {
        ease = 'Linear';
    }

    var config = {};
    config.mode = 0;
    switch (orientation) {
        case 0:
        case 'x':
            config.end = {
                x: 0
            };
            break;
        case 1:
        case 'y':
            config.end = {
                y: 0
            };
            break;
        default:
            config.end = 0;
            break;
    }
    config.duration = duration;
    config.ease = ease;

    if (scale === undefined) {
        scale = new Scale(gameObject, config);
    } else {
        scale.resetFromJSON(config);
    }
    scale.restart();

    return scale;
};

export default ScaleDown;