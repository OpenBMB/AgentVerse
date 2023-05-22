var GetShowCallback = function () {
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            sides.setChildVisible(child, true);
        }
    }
}

var GetHideCallback = function () {
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            sides.setChildVisible(child, false);
        }
    }
}

export default {
    show: GetShowCallback,
    hide: GetHideCallback
}