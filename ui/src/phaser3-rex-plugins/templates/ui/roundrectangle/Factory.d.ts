import RoundRectangle from './RoundRectangle';

export default function (
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig?: number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig |
        ({
            radius?: (number | ({ x?: number, y?: number }) | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),
    fillColor?: number,
    fillAlpha?: number

): RoundRectangle;