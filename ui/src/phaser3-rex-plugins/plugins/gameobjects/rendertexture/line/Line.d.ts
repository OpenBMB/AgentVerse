export default Line;

declare namespace Line {

    type ExtendModeTyp = 0 | 1 | 'scale' | 'repeat';

    interface IConfig {
        start?: {
            x?: number, y?: number,
            key?: string, frame?: string, origin?: number
        } |
        string,

        end?: {
            x?: number, y?: number,
            key?: string, frame?: string, origin?: number
        } |
        string,

        body?: {
            key?: string, frame?: string,
            extendMode?: ExtendModeTyp, width?: number,
        } |
        string,
    }
}

declare class Line extends Phaser.GameObjects.RenderTexture {
    constructor(
        scene: Phaser.Scene,
        config?: Line.IConfig
    )

    setLineStartPosition(x?: number, y?: number): this;
    x0: number;
    y0: number;

    setLineEndPosition(x?: number, y?: number): this;
    x1: number;
    y1: number;

    setLineStartTexture(key?: string, frameName?: string): this;
    setLineEndTexture(key?: string, frameName?: string): this;
    setLineBodyTexture(key?: string, frameName?: string): this;

    setLineStartOrigin(origin: number): this;
    setLineEndOrigin(origin: number): this;
    setLineBodyExtendMode(mode: Line.ExtendModeTyp): this;
    setLineBodyWidth(width: number);

}