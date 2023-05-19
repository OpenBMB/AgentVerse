export default ShatterImage;

declare namespace ShatterImage {
    type GetRingRadiusListCallback = (width: number, height: number) => number[];

    interface IConfig {
        x?: number,
        y?: number,
        key: string,
        frame?: string,

        ringRadiusList?: number[] | GetRingRadiusListCallback,
        samplesPerRing?: number,
        variation?: number,

    }

    interface ShatterIConfig {
        centerX?: number,
        centerY?: number,
        ringRadiusList?: number[] | GetRingRadiusListCallback,
        samplesPerRing?: number,
        variation?: number,
    }
}

declare class ShatterImage extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string, frame?: string,
        config?: ShatterImage.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: ShatterImage.IConfig
    );

    shatter(
        centerX?: number,
        centerY?: number,
        config?: ShatterImage.ShatterIConfig
    ): this;
    shatter(
        config?: ShatterImage.ShatterIConfig
    ): this;
    readonly shatterCenter: { x: number, y: number };

    ringRadiusList: number[] | ShatterImage.GetRingRadiusListCallback;
    setRingRadiusList(ringRadiusList: number[] | ShatterImage.GetRingRadiusListCallback): this;

    samplesPerRing: number;
    setSamplesPerRing(samplesPerRing: number): this;

    variation: number;
    setVariation(variation: number): this;

    startUpdate(): this;
    stopUpdate(): this;

    resetImage(): this;
}