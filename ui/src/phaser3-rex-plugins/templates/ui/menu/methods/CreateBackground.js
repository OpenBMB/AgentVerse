var CreateBackground = function (scene, items, callback, scope) {
    var background;
    if (callback) {
        items.scene = scene;
        if (scope) {
            background = callback.call(scope, items);
        } else {
            background = callback(items);
        }
        items.scene = undefined;
    }

    return background;
}

export default CreateBackground;