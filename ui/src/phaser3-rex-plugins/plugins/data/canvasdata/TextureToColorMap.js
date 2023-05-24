import CanvasData from './canvasdata/CanvasData.js';
import CanvasToData from './canvasdata/CanvasToData.js';
import ColorBuffer from '../../utils/arraybuffers/FourBytesBuffer.js';
import FillColor from './fillcallbacks/color32.js';
import IsGameObject from '../../utils/system/IsGameObject.js';
import DrawFrame from '../../utils/texture/DrawFrameToCanvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var TextureTColorMap = function (key, frameName, config, out) {
    var frame;
    if (typeof (key) === 'string') {
        if (typeof (frameName) !== 'string') {
            out = config;
            config = frameName;
            frameName = undefined;
        }
        frame = this.textureManager.getFrame(key, frameName);
    } else {
        frame = (IsGameObject(key)) ? key.frame : key;
        out = config;
        config = frameName;
    }

    if (config instanceof CanvasData) {
        out = config;
        config = undefined;
    }

    var hasDefaultCanvas = (this._tmpCanvas !== undefined);
    var canvas = (hasDefaultCanvas) ?
        this._tmpCanvas :
        CanvasPool.create2D(this, undefined, undefined, undefined, true);

    var x = GetValue(config, 'x', undefined);
    var y = GetValue(config, 'y', undefined);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    out = CanvasToData(
        DrawFrame(frame, canvas), // canvas
        x, y, width, height, // x, y, width, height
        ColorBuffer, FillColor, undefined, // BufferClass, fillCallback, fillCallbackScope
        out);

    if (!hasDefaultCanvas) {
        CanvasPool.remove(canvas);
    } else {
        canvas.width = 1;
        canvas.height = 1;
    }
    return out;
};

export default TextureTColorMap;