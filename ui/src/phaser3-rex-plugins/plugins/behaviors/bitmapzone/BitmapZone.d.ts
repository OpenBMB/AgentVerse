export default BitmapZone;

declare namespace BitmapZone {
    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        scaleX?: number, scaleY?: number,
        offsetX?: number, offsetY?: number,
    }
}

declare class BitmapZone {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: BitmapZone.IConfig
    );

    getRandomPoint: Phaser.Types.GameObjects.Particles.RandomZoneSourceCallback;

    setOffset(offsetX?: number, offsetY?: number): this;
    offsetX: number;
    offsetY: number;

    setScale(scaleX?: number, scaleY?: number): this;
    scaleX: number;
    scaleY: number;
}