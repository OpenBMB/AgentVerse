// import * as Phaser from 'phaser';

export default RoundRectangle;

declare namespace RoundRectangle {

    type CornerRadiusType = {
        x: number,
        y: number,
        convex: boolean
    };

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number }),

        x?: number,
        y?: number,
    }

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radius?: number | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),

        color?: number,
        alpha?: number,

        strokeColor?: number,
        strokeAlpha?: number,
        strokeWidth?: number,

        shape?: 0 | 'rectangle' | 1 | 'circle',
    }

}

declare class RoundRectangle extends Phaser.GameObjects.Shape {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        radiusConfig?: number | RoundRectangle.IRadiusConfig |
            ({
                radius?: (number | RoundRectangle.IRadiusConfig),
                iteration?: number
            }),
        fillColor?: number,
        fillAlpha?: number
    );

    constructor(
        scene: Phaser.Scene,
        config?: RoundRectangle.IConfig
    )

    resize(width: number, height: number): this;

    setIteration(iteration: number): this;
    iteration: number;

    setRadius(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    radius: number;

    setRadiusTL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    radiusTL: number;

    setRadiusTR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    radiusTR: number;

    setRadiusBL(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    radiusBL: number;

    setRadiusBR(
        value: number | RoundRectangle.IRadiusConfig
    ): this;
    radiusBR: number;

    readonly cornerRadius: {
        tl: RoundRectangle.CornerRadiusType,
        tr: RoundRectangle.CornerRadiusType,
        bl: RoundRectangle.CornerRadiusType,
        br: RoundRectangle.CornerRadiusType,
    };
}