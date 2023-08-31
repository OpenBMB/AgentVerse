var GetCallback = function (duration, ease) {
    return function (child, key, sides, reset) {
        if (key === 'panel') {
            sides.moveChild(child, ((reset) ? 0 : duration), ease);
        }
    }
}

export default {
    show: GetCallback,
    hide: GetCallback
}