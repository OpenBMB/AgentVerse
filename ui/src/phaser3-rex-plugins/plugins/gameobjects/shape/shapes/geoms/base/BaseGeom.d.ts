import DataMethods from '../../../../../utils/data/DataMethods.js';

export default class BaseGeom extends DataMethods {
    name: string;
    dirty: boolean;
    data: { [name: string]: any } | undefined;

    isFilled: boolean;
    fillColor: number;
    fillAlpha: number;

    isStroked: boolean;
    lineWidth: number;
    strokeColor: number;
    strokeAlpha: number;

    fillStyle(
        color?: number,
        alpha?: number
    ): this;
    lineStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;
}