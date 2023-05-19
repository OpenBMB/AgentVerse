// import * as Phaser from 'phaser';
import Image from '../image/Image';
export default RenderTexture;

declare namespace RenderTexture {

    interface IConfig extends Image.IConfig {
        width?: number, height?: number,
    }

    interface SnapshotIConfig {
        x?: number, y?: number,
        width?: number, height?: number,
        padding?: number,
    }

}

declare class RenderTexture extends Image {
    constructor(
        scene: Phaser.Scene,
        x?: number | RenderTexture.IConfig,
        y?: number,
        width?: number,
        height?: number,
        config?: RenderTexture.IConfig
    )

    readonly rt: Phaser.GameObjects.RenderTexture;

    snapshot(
        gameObjects: Phaser.GameObjects.GameObject[],
        config?: RenderTexture.SnapshotIConfig
    ): this;
}
