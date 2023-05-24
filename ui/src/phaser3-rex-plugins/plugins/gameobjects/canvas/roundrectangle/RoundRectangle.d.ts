import Canvas from '../canvas/Canvas';

export default RoundRectangle;

declare namespace RoundRectangle {

    interface IRadiusConfig {
        tl?: (number | { x?: number, y?: number }),
        tr?: (number | { x?: number, y?: number }),
        bl?: (number | { x?: number, y?: number }),
        br?: (number | { x?: number, y?: number }),

        x?: number,
        y?: number,
    }

}

declare class RoundRectangle extends Canvas {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        radiusConfig?: number | RoundRectangle.IRadiusConfig |
            ({
                radius?: (number | RoundRectangle.IRadiusConfig),
                iteration?: number
            }),
        fillStyle?: number | string | null,
        strokeStyle?: number | string | null,
        lineWidth?: number,

        fillColor2?: number | string | null,
        isHorizontalGradient?: boolean
    );

    fillStyle: string;
    fillColor2: string;
    isHorizontalGradient: boolean;
    setFillStyle(
        fillStyle?: number | string | null,
        fillColor2?: number | string | null,
        isHorizontalGradient?: boolean,
    ): this;

    strokeStyle: string;
    lineWidth: number;
    setStrokeStyle(
        strokeStyle?: number | string | null,
        lineWidth?: number,
    ): this;

    radius: number | RoundRectangle.IRadiusConfig;
    setRadius(
        value?: number | RoundRectangle.IRadiusConfig
    ): this;

    iteration: number;
    setIteration(value?: number): this;
}