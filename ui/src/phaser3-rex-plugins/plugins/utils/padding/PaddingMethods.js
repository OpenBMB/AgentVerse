const GetValue = Phaser.Utils.Objects.GetValue;

var GetPadding = function (padding, key) {
    if (key === undefined) {
        return padding;
    }
    return padding[key];
}

var SetPadding = function (padding, key, value) {
    if (padding === undefined) {
        padding = {};
    }
    if (key === undefined) {
        key = 0;
    }

    var keyType = typeof (key);
    if (keyType === 'string') {
        padding[key] = value;
    } else if (keyType === 'number') {
        padding.left = key;
        padding.right = key;
        padding.top = key;
        padding.bottom = key;
    } else {
        padding.left = GetValue(key, 'left', 0);
        padding.right = GetValue(key, 'right', 0);
        padding.top = GetValue(key, 'top', 0);
        padding.bottom = GetValue(key, 'bottom', 0);
    }
    return padding;
}

export {
    GetPadding,
    SetPadding
}