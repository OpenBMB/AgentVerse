// import * as Phaser from 'phaser';

export default NinePatch;

declare namespace NinePatch {

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        key?: string, baseFrame?: string,
        getFrameNameCallback?: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined),

        columns?: (number | undefined)[],
        rows?: (number | undefined)[],

        stretchMode?: 0 | 1 | 'scale' | 'repeat' |
        {
            edge?: 0 | 1 | 'scale' | 'repeat',
            internal?: 0 | 1 | 'scale' | 'repeat',
        },

        maxFixedPartScale?: number,
        maxFixedPartScaleX?: number,
        maxFixedPartScaleY?: number,

        preserveRatio?: boolean,
    }

}

declare class NinePatch extends Phaser.GameObjects.RenderTexture {
    constructor(
        scene: Phaser.Scene,
        config?: NinePatch.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: NinePatch.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: NinePatch.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        key: string,
        config?: NinePatch.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        key: string,
        columns: (number | undefined)[], rows: (number | undefined)[],
        config?: NinePatch.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        key: string, baseFrame: string,
        columns: (number | undefined)[], rows: (number | undefined)[],
        config?: NinePatch.IConfig
    )

    resize(width: number, height: number): this;

    setBaseTexture(
        key: string,
        baseFrame: string | undefined,
        columns: (number | undefined)[],
        rows: (number | undefined)[]
    ): this;

    setStretchMode(
        mode: 0 | 1 | 'scale' | 'repeat' |
        {
            edge?: 0 | 1 | 'scale' | 'repeat',
            internal?: 0 | 1 | 'scale' | 'repeat',
        }
    ): this;

    setGetFrameNameCallback(
        callback: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined)
    ): this;

    updateTexture(): this;

    setPreserveRatio(enable?: boolean): this;
    preserveRatio: boolean;

    setMaxFixedPartScale(scaleX: number, scaleY?: number): this;
    maxFixedPartScaleX: number;
    maxFixedPartScaleY: number;

    readonly minWidth: number;

    readonly minHeight: number;

    readonly fixedPartScaleX: number;

    readonly fixedPartScaleY: number;
}