import CanvasData from "./canvasdata/CanvasData";

export default TextureTColorMap;

declare namespace TextureTColorMap {
    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,
    }
}

declare function TextureTColorMap(
    gameObject: Phaser.GameObjects.GameObject | Phaser.Textures.Frame,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

declare function TextureTColorMap(
    gameObject: Phaser.GameObjects.GameObject | Phaser.Textures.Frame,
    out?: CanvasData
): CanvasData;

declare function TextureTColorMap(
    key: string,
    frameName: string | null,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

declare function TextureTColorMap(
    key: string,
    frameName: string | null,
    out?: CanvasData
): CanvasData;

declare function TextureTColorMap(
    key: string,
    config?: TextureTColorMap.IConfig,
    out?: CanvasData
): CanvasData;

declare function TextureTColorMap(
    key: string,
    out?: CanvasData
): CanvasData;
