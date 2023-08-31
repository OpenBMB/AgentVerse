import CanvasBase from '../canvasbase/Canvas.js';
import LoadImageMethods from './LoadImageMethods.js';

class Canvas extends CanvasBase {

}

Object.assign(
    Canvas.prototype,
    LoadImageMethods,
)

export default Canvas;