import CanvasData from "./canvasdata/CanvasData";

export default CanvasObjectToBitmap;

declare namespace CanvasObjectToBitmap {
    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,
    }
}

declare function CanvasObjectToBitmap(
    gameObject: Phaser.GameObjects.GameObject,
    config?: CanvasObjectToBitmap.IConfig,
    out?: CanvasData
): CanvasData;

declare function CanvasObjectToBitmap(
    gameObject: Phaser.GameObjects.GameObject,
    out?: CanvasData
): CanvasData;