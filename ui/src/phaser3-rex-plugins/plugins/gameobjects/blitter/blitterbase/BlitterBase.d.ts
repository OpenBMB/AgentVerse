import BobBase from './bob/Base';

export default BlitterBase;

declare namespace BlitterBase {
    interface IConfig {
        reuseBob?: boolean,
    }
}

declare class BlitterBase extends Phaser.GameObjects.GameObject {
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        texture?: string,
        frame?: string,
        config?: BlitterBase.IConfig
    );

    children: Phaser.Structs.List<BobBase>;

    texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    frame: Phaser.Textures.Frame;
    setTexture(
        key: string,
        frame?: string | number | undefined,
    ): this;

    resize(width: number, height: number): this;
    setSize(width: number, height: number): this;

    addChild(
        bob: BobBase
    ): this;

    removeChild(
        bob: BobBase
    ): this;

    removeChildren(): this;

    clear(): this;

    getLastAppendedChildren(
    ): BobBase[];

    getChildren(
    ): BobBase[];


    setTint(tint: number): this;
    setTintFill(tint: number): this;
    clearTint(): this;
    tint: number;
    tintFill: boolean;

    // Components
    clearAlpha(): this;
    setAlpha(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    alpha: number;
    alphaTopLeft: number;
    alphaTopRight: number;
    alphaBottomLeft: number;
    alphaBottomRight: number;

    blendMode: Phaser.BlendModes | string;
    setBlendMode(value: string | Phaser.BlendModes): this;

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    setDisplaySize(width: number, height: number): this;

    depth: number;
    setDepth(value: number): this;

    getCenter<O extends Phaser.Math.Vector2>(output?: O): O;
    getTopLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getTopCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getTopRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getLeftCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getRightCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBounds<O extends Phaser.Geom.Rectangle>(output?: O): O;

    mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask;
    setMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask): this;
    clearMask(destroyMask?: boolean): this;
    createBitmapMask(renderable?: Phaser.GameObjects.GameObject): Phaser.Display.Masks.BitmapMask;
    createGeometryMask(graphics?: Phaser.GameObjects.Graphics): Phaser.Display.Masks.GeometryMask;

    originX: number;
    originY: number;
    displayOriginX: number;
    displayOriginY: number;
    setOrigin(x?: number, y?: number): this;
    setOriginFromFrame(): this;
    setDisplayOrigin(x?: number, y?: number): this;
    updateDisplayOrigin(): this;

    defaultPipeline: Phaser.Renderer.WebGL.WebGLPipeline;
    pipeline: Phaser.Renderer.WebGL.WebGLPipeline;
    hasPostPipeline: boolean;
    postPipelines: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
    pipelineData: object;
    initPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): boolean;
    setPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline, pipelineData?: object, copyData?: boolean): this;
    setPostPipeline(pipelines: string | string[] | Function | Function[] | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[], pipelineData?: object, copyData?: boolean): this;
    setPipelineData(key: string, value?: any): this;
    getPostPipeline(pipeline: string | Function | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
    resetPipeline(resetPostPipelines?: boolean, resetData?: boolean): boolean;
    resetPostPipeline(resetData?: boolean): void;
    removePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
    getPipelineName(): string;

    scrollFactorX: number;
    scrollFactorY: number;
    setScrollFactor(x: number, y?: number): this;

    x: number;
    y: number;
    z: number;
    w: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    rotation: number;
    setPosition(x?: number, y?: number, z?: number, w?: number): this;
    copyPosition(source: Phaser.Types.Math.Vector2Like | Phaser.Types.Math.Vector3Like | Phaser.Types.Math.Vector4Like): this;
    setRandomPosition(x?: number, y?: number, width?: number, height?: number): this;
    setRotation(radians?: number): this;
    setAngle(degrees?: number): this;
    setScale(x: number, y?: number): this;
    setX(value?: number): this;
    setY(value?: number): this;
    setZ(value?: number): this;
    setW(value?: number): this;
    getLocalTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    getWorldTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix, parentMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    getLocalPoint(x: number, y: number, point?: Phaser.Math.Vector2, camera?: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2;
    getParentRotation(): number;

    visible: boolean;
    setVisible(value: boolean): this;
}
