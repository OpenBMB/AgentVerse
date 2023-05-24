import GetStyle from '../canvas/GetStyle.js';
import DrawCircle from '../canvas/DrawCircle.js';

var CreateCircleTexture = function (
    scene,
    key,
    width,
    fillStyle,
    strokeStyle, lineWidth,
    expandSize
) {

    if ((fillStyle === undefined) && (strokeStyle === undefined)) {
        fillStyle = 0xffffff;
    }
    if (strokeStyle === undefined) {
        lineWidth = 0;
    } else if (lineWidth === undefined) {
        lineWidth = 2;
    }
    if (expandSize === undefined) {
        expandSize = false;
    }

    var r, x;
    if (!expandSize) {
        x = width / 2;
        r = x - (lineWidth / 2);
    } else {
        r = width / 2;
        width += lineWidth;
        x = width / 2;
    }

    var texture = scene.sys.textures.createCanvas(key, width, width);
    var canvas = texture.getCanvas();
    var context = texture.getContext();

    DrawCircle(
        canvas, context,
        x, x, r, r,
        GetStyle(fillStyle),
        GetStyle(strokeStyle), lineWidth
    );

    texture.refresh();
}
export default CreateCircleTexture;