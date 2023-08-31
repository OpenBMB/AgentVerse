import Live2dGameObjectBase from './Live2dGameObjectBase';

export default Live2dGameObject;

declare namespace Live2dGameObject {
    interface IConfig {
        autoPlayIdleMotion?: string
    }

    type ParametersType = { [name: string]: number };

    interface ILookAtConfig {
        camera?: Phaser.Cameras.Scene2D.Camera;

        eyeBallX?: number, eyeBallY?: number,
        angleX?: number, angleY?: number, angleZ?: number,
        bodyAngleX?: number,
    }

    type HitTestResultType = { [name: string]: boolean };
}

declare class Live2dGameObject extends Live2dGameObjectBase {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        key?: string,
        config?: Live2dGameObject.IConfig
    );

    setModel(
        key: string,
        config?: Live2dGameObject.IConfig
    ): this;

    // Expression
    getExpressionNames(): string[];

    setExpression(expressionName: string): this;

    expressionName: string;

    // Motion
    getMotionNames(groupName?: string): string[];

    getMotionGroupNames(): string[];

    startMotion(
        group: string,
        no?: number | undefined,
        priority?: 'none' | 'idle' | 'normal' | 'force' | 0 | 1 | 2 | 3
    ): this;

    stopAllMotions(): this;

    getPlayinigMotionNames(): string[];

    isAnyMotionPlaying(): boolean;

    autoPlayIdleMotion(motionName: string): this;

    // Time-scale
    setTimeScale(timeScale: number): this;
    timeScale: number;

    // Parameter
    registerParameter(name: string): this;

    addParameterValue(
        name: string,
        value: number
    ): this;

    resetParameterValue(name: string): this

    getParameters(): Live2dGameObject.ParametersType;

    get params(): Live2dGameObject.ParametersType;

    lookAt(
        x: number,
        y: number,
        config?: Live2dGameObject.ILookAtConfig
    ): this;

    lookForward(config?: Live2dGameObject.ILookAtConfig): this;

    // LipSync
    setLipSyncValue(value: number): this;

    lipSyncValue: number;

    // Hit test
    getHitTestResult(): Live2dGameObject.HitTestResultType;

    get hitTestResult(): Live2dGameObject.HitTestResultType;

    hitTest(
        hitAreaName: string,
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): boolean;

    // Position
    getModelXY(
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera,
        out?: { x: number, y: number }
    ): { x: number, y: number };

}