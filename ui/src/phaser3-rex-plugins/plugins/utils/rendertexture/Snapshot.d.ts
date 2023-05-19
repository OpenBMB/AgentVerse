export default Snapshot;

declare namespace Snapshot {
    interface IConfig {
        gameObjects: Phaser.GameObjects.GameObject[],
        renderTexture?: Phaser.GameObjects.RenderTexture,

        x?: number, y?: number,
        width?: number, height?: number,
        padding?: number,
        originX?: number, originY?: number,

        saveTexture?: string,
    }
}

declare function Snapshot(
    config: Snapshot.IConfig
): Phaser.GameObjects.RenderTexture;