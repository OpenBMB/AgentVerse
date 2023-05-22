import CanvasObjectToBitmap from './data/canvasdata/CanvasObjectToBitmap';
import TextureTColorMap from './data/canvasdata/TextureToColormap';

declare var Methods: {
    textObjectToBitmap: typeof CanvasObjectToBitmap,
    canvasObjectToBitmap: typeof CanvasObjectToBitmap,
    textureTColorMap: typeof TextureTColorMap,
}

export default Methods;