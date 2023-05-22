export default DrawBounds;

declare namespace DrawBounds {
    interface IConfig {
        color?: number,
        lineWidth?: number,

        fillColor?: number,
        fillAlpha?: number,

        padding?: number,

    }
}

declare function DrawBounds(
    gameObjects: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject,
    graphics: Phaser.GameObjects.Graphics,
    config?: number,
): void;

declare function DrawBounds(
    gameObjects: Phaser.GameObjects.GameObject[] | Phaser.GameObjects.GameObject,
    graphics: Phaser.GameObjects.Graphics,
    config?: DrawBounds.IConfig
): void;