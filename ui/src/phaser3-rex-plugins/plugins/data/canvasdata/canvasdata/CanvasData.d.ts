export default CanvasData;

declare namespace CanvasData {
    type ForEachCallbackType = (
        value: number,
        x: number, y: number,
        canvasData: CanvasData
    ) => void;

}

declare class CanvasData {

    readonly width: number;
    readonly height: number;

    destroy(): void;

    color32ToColorInt(value: number): number;

    color32ToAlpha(value: number): number;

    forEach(
        callback: CanvasData.ForEachCallbackType,
        scope?: object
    ): this;

    forEachNonZero(
        callback: CanvasData.ForEachCallbackType,
        scope?: object
    ): this;

    get(
        x: number, y: number
    ): boolean | number;

}