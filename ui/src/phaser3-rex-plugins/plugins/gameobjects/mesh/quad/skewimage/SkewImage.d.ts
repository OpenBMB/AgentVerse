// import * as Phaser from 'phaser';
import Image from '../image/Image';

export default SkewImage;

declare namespace SkewImage {

    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string
    }

}

declare class SkewImage extends Image {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string | null
    )

    constructor(
        scene: Phaser.Scene,
        config?: SkewImage.IConfig
    )

    skewX: number;
    skewY: number;
    skewXDeg: number;
    skewYDeg: number;

    setSkewX(skewX: number): this;
    setSkewY(skewY: number): this;
    setSkew(skewX: number, skewY?: number): this;
    setSkewXDeg(skewX: number): this;
    setSkewYDeg(skewY: number): this;
    setSkewDeg(skewX: number, skewY?: number): this;
}