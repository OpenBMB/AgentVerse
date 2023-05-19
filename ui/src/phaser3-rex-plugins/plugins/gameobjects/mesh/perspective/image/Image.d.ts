// import * as Phaser from 'phaser';

export default Image;

declare namespace Image {

    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string,
        hideCCW?: boolean,
        gridWidth?: number,
        girdHeight?: number
    }

}

declare class Image extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number | Image.IConfig,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    readonly originX: number;
    readonly originY: number;
    readonly displayOriginX: number;
    readonly displayOriginY: number;

    transformVerts(
        x?: number, y?: number, z?: number,
        rotateX?: number, rotateY?: number, rotateZ?: number
    ): this;

    angleX: number;
    angleY: number;
    angleZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;

    setTint(color: number): this;

}