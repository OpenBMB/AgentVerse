export default class ScalePlugin extends Phaser.Plugins.ScenePlugin {
    add(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
    ): this;

    scale(): this;

    readonly scrollX: number;
    readonly scrollY: number;
    readonly zoom: number;
    readonly innerViewport: Phaser.Geom.Rectangle;
    readonly outerViewport: Phaser.Geom.Rectangle;

    getShrinkedOuterViewport(
        maxRatio: number,
        minRatio?: number,
        out?: Phaser.Geom.Rectangle | true,
    ): Phaser.Geom.Rectangle;
}