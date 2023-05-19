// import * as Phaser from 'phaser';

export default class SplitPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setSplit(x?: number, y?: number): this;
    splitX: number;
    splitY: number;

    setSpace(left?: number, right?: number, top?: number, bottom?: number): this;
    spaceLeft: number;
    spaceRight: number;
    spaceTop: number;
    spaceBottom: number;
    setSplittedWidth(width?: number): this;
    splittedWidth: number;
    setSplittedHeight(height?: number): this;
    splittedHeight: number;

    splitAtCenter(width?: number, height?: number): this;

    setAngle(angle: number): this;
    setRotation(rotation: number): this;
    angle: number;
    rotation: number;

    setShiftEnable(enable?: boolean): this;
    shiftEnable: boolean;
}