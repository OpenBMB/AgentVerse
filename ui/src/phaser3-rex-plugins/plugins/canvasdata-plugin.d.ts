import CanvasObjectToBitmap from './data/canvasdata/CanvasObjectToBitmap';
import TextureTColorMap from './data/canvasdata/TextureToColormap';

export default class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {
    textObjectToBitmap: typeof CanvasObjectToBitmap;
    canvasObjectToBitmap: typeof CanvasObjectToBitmap;
    textureTColorMap: typeof TextureTColorMap;
}