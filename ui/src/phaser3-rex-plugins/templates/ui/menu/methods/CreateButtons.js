var CreateButtons = function (scene, items, callback, scope) {
    var item;
    var buttons = [],
        button;
    if (items && callback) {
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            item = items[i];
            item.scene = scene;
            if (scope) {
                button = callback.call(scope, item, i, items);
            } else {
                button = callback(item, i, items);
            }
            item.scene = undefined;
            buttons.push(button);
        }
    }

    return buttons;
}

export default CreateButtons;