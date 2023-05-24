const GetValue = Phaser.Utils.Objects.GetValue;

var GetBoundsConfig = function (config, out) {
    if (out === undefined) {
        out = {};
    }
    if (typeof (config) === 'number') {
        out.left = config;
        out.right = config;
        out.top = config;
        out.bottom = config;
    } else {
        out.left = GetValue(config, 'left', 0);
        out.right = GetValue(config, 'right', 0);
        out.top = GetValue(config, 'top', 0);
        out.bottom = GetValue(config, 'bottom', 0);
    }
    return out;
}

export default GetBoundsConfig;