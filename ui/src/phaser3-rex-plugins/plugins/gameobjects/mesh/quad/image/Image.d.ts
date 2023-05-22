// import * as Phaser from 'phaser';

export default Image;

declare namespace Image {

    interface IConfig {
        x: number, y: number,
        key?: string,
        frame?: string,

        ninePointMode?: boolean,
        rtl?: boolean,
    }

    class ControlPoint {
        setWorldXY(x: number, y: number): this;
        setPosition(x: number, y: number): this;
        getWorldXY(): { x: number, y: number };

        x: number;
        y: number;

    }

}

declare class Image extends Phaser.GameObjects.Mesh {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string | null,
        config?: Image.IConfig
    )

    constructor(
        scene: Phaser.Scene,
        config?: Image.IConfig
    )

    readonly controlPoints: Image.ControlPoint[];
    readonly topLeft: Image.ControlPoint;
    readonly topCenter: Image.ControlPoint;
    readonly topRight: Image.ControlPoint;
    readonly centerLeft: Image.ControlPoint;
    readonly center: Image.ControlPoint;
    readonly centerRight: Image.ControlPoint;
    readonly bottomLeft: Image.ControlPoint;
    readonly bottomCenter: Image.ControlPoint;
    readonly bottomRight: Image.ControlPoint;
}