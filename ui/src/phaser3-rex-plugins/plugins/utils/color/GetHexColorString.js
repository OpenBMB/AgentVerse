const Pad = Phaser.Utils.String.Pad;

var GetHexColorString = function (value, prefix) {
    if (prefix === undefined) {
        prefix = '0x'
    }
    var colorString = value.toString(16).toUpperCase();
    colorString = Pad(colorString, 6, 0, 1);
    colorString = prefix + colorString;
    return colorString;
}

export default GetHexColorString;