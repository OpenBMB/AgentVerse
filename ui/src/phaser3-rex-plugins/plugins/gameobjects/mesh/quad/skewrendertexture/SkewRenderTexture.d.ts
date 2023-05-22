// import * as Phaser from 'phaser';
import SkewImage from '../skewimage/SkewImage';

export default SkewRenderTexture;

declare namespace SkewRenderTexture {

    interface IConfig extends SkewImage.IConfig {
        width?: number, height?: number,
    }

}

declare class SkewRenderTexture extends SkewImage {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number
    )

    constructor(
        scene: Phaser.Scene,
        config?: SkewRenderTexture.IConfig
    )

    readonly rt: Phaser.GameObjects.RenderTexture;
}
