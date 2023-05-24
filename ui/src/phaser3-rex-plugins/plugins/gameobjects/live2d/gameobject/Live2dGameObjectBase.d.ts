export default Live2dGameObjectBase;

declare namespace Live2dGameObjectBase {

}

declare class Live2dGameObjectBase extends Phaser.GameObjects.GameObject {

    clearAlpha(): this;
    setAlpha(value?: number): this;
    alpha: number;

    blendMode: Phaser.BlendModes | string;
    setBlendMode(value: string | Phaser.BlendModes): this;

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    setSize(width: number, height: number): this;
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

    originX: number;
    originY: number;
    displayOriginX: number;
    displayOriginY: number;
    setOrigin(x?: number, y?: number): this;
    setOriginFromFrame(): this;
    setDisplayOrigin(x?: number, y?: number): this;
    updateDisplayOrigin(): this;

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