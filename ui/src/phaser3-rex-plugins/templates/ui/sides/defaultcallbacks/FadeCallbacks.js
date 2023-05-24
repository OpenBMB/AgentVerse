var GetShowCallback = function (duration, alpha) {
    if (alpha === undefined) {
        alpha = 1;
    }
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            sides.fadeChild(child, ((reset) ? 0 : duration), alpha);
        }
    }
}

var GetHideCallback = function (duration, alpha) {
    if (alpha === undefined) {
        alpha = 0;
    }
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            sides.fadeChild(child, ((reset) ? 0 : duration), alpha);
        }
    }
}

export default {
    show: GetShowCallback,
    hide: GetHideCallback
}