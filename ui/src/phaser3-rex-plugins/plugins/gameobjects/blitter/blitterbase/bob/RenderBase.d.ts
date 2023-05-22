import BobBase from './Base';

export default RenderBase;

declare namespace RenderBase {
    interface IModifyConfig {
        x?: number, y?: number,

        rotation?: number, angle?: number,

        alpha?: number,

        width?: number, height?: number,
        scale?: number, scaleX?: number, scaleY?: number,
        displayWidth?: number, displayHeight?: number,

        origin?: number, originX?: number, originY?: number,

        depth?: number
    }
}

declare class RenderBase extends BobBase {
    visible: boolean;
    setVisible(visible?: boolean): this;

    alpha: number;
    setAlpha(alpha: number): this;

    x: number;
    y: number;
    setX(x: number): this;
    setY(y: number): this;
    setPosition(x: number, y: number): this;

    rotation: number;
    angle: number;
    setRotation(rotation: number): this;
    setAngle(angle: number): this;

    width: number;
    height: number;
    setWidth(
        width: number,
        keepAspectRatio?: boolean
    ): this;
    setHeight(
        height: number,
        keepAspectRatio?: boolean
    ): this;

    scaleX: number;
    scaleY: number;
    setScaleX(scaleX: number): this;
    setScaleY(scaleY: number): this;
    setScale(scaleX: number, scaleY: number): this;

    displayWidth: number;
    displayHeight: number;
    setDisplayWidth(
        width: number,
        keepAspectRatio?: boolean
    ): this;
    setDisplayHeight(
        height: number,
        keepAspectRatio?: boolean
    ): this;

    originX: number;
    originY: number;
    setOriginX(originX: number): this;
    setOriginY(originY: number): this;
    setOrigin(originX: number, originY: number): this;

    depth: number;
    setDepth(depth?: number): this;

    modifyPorperties(
        o?: RenderBase.IModifyConfig
    ): this;
}