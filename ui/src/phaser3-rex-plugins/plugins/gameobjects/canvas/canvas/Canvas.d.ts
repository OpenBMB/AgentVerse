import CanvasBase from '../canvasbase/Canvas';

export default class Canvas extends CanvasBase {
    loadFromURL(
        url: string,
        callback?: () => void
    ): this;

    loadFromURLPromise(
        url: string
    ): Promise<any>;

    loadFromFile(
        file: File,
        callback?: () => void
    ): this;

    loadFromFilePromise(
        file: File
    ): Promise<any>;

}