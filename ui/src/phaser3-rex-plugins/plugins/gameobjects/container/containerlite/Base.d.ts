export default Base;

declare class Base extends Phaser.GameObjects.Zone {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
    );

    contains(
        gameObject: Phaser.GameObjects.GameObject
    ): boolean;

    add(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    clear(
        destroyChild?: boolean
    ): this;


    // Components
    clearAlpha(): this;
    setAlpha(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    alpha: number;
    alphaTopLeft: number;
    alphaTopRight: number;
    alphaBottomLeft: number;
    alphaBottomRight: number;

    toggleFlipX(): this;
    toggleFlipY(): this;
    setFlipX(value: boolean): this;
    setFlipY(value: boolean): this;
    setFlip(x: boolean, y: boolean): this;
    resetFlip(): this;
}