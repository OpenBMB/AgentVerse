import GetBoundsConfig from '../../../utils/bounds/GetBoundsConfig.js';

const Rectangle = Phaser.Geom.Rectangle;
const GetValue = Phaser.Utils.Objects.GetValue;

var BoundsToPoints = function (gameObject, config) {
    if (globRect === undefined) {
        globRect = new Rectangle();
    }

    globPadding = GetBoundsConfig(GetValue(config, 'padding', 0), globPadding);
    var w = gameObject.width,
        h = gameObject.height;
    var x = (-w / 2) - globPadding.left,
        y = (-h / 2) - globPadding.top;
    w += globPadding.left + globPadding.right;
    h += globPadding.top + globPadding.bottom;
    globRect.setTo(x, y, w, h);
    var stepRate = GetValue(config, 'stepRate', 10);
    var points = globRect.getPoints(0, stepRate);
    return points; // Return new point array
}

var globRect;
var globPadding;

export default BoundsToPoints;
