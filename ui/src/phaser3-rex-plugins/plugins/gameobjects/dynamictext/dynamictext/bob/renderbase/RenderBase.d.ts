// import * as Phaser from 'phaser';
import Base from '../Base';

export default RenderBase;

declare namespace RenderBase {
    type DrawCallbackType = (
        bob: RenderBase
    ) => void;
}

declare class RenderBase extends Base {
    renderable: boolean;
    removed: boolean;
    toLocalPosition: boolean;

    setVisible(visible?: boolean): this;
    visible: boolean;

    setAlpha(alpha: number): this;
    alpha: number;

    setPosition(x: number, y: number): this;
    setX(x: number): this;
    setY(y: number): this;
    x: number;
    y: number;

    setAngle(degrees: number): this;
    setRotation(radians: number): this;
    angle: number;
    rotation: number;

    setScale(scaleX: number, scaleY?: number): this;
    setScaleX(scaleX: number): this;
    setScaleY(scaleY: number): this;
    scaleX: number;
    scaleY: number;

    setWidth(width: number, keepAspectRatio?: boolean): this;
    width: number;
    setLeftSpace(value: number): this;
    leftSpace: number;
    setRightSpace(value: number): this;
    rightSpace: number;
    readonly outerWidth: number;

    setHeight(height: number, keepAspectRatio?: boolean): this;
    height: number;

    setOrigin(x: number): this;
    originX: number;
    offsetX: number;
    offsetY: number;

    readonly willRender: boolean;

    setDrawBelowCallback(
        callback?: RenderBase.DrawCallbackType
    ): this;

    setDrawAboveCallback(
        callback?: RenderBase.DrawCallbackType
    ): this;

    readonly drawTLX: number;
    readonly drawTLY: number;
    readonly drawBLX: number;
    readonly drawBLY: number;
    readonly drawTRX: number;
    readonly drawTRY: number;
    readonly drawBRX: number;
    readonly drawBRY: number;
}