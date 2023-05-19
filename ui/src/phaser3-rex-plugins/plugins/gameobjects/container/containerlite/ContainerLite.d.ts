// import * as Phaser from 'phaser';
import Base from './Base';

export default ContainerLite;

declare namespace ContainerLite {
    interface ILocalState {
        parent: ContainerLite,
        self: Phaser.GameObjects.GameObject,
        layer: Phaser.GameObjects.Layer | null,

        x: number, y: number,
        rotation: number, angle: number,
        scaleX: number, scaleY: number, displayWidth: number, displayHeight: number,
        alpha: number,
        visible: boolean,
        active: boolean,
    }

    interface IAddChildConfig {
        syncPosition?: boolean,
        syncRotation?: boolean,
        syncScale?: boolean,
        syncAlpha?: boolean,
        syncScrollFactor?: boolean,

    }

    interface IDrawBoundsConfig {
        drawContainer?: boolean,
        children?: Phaser.GameObjects.GameObject,
        color?: number,
        lineWidth?: number,
        padding?: number,
    }
}

declare class ContainerLite extends Base {
    isRexContainerLite: true;

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        children?: Phaser.GameObjects.GameObject[]
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        children?: Phaser.GameObjects.GameObject[]
    );

    add(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    pin(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
        config?: ContainerLite.IAddChildConfig | boolean
    ): this;

    unpin(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    addMultiple(
        children: Phaser.GameObjects.GameObject[]
    ): this;

    addLocal(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    pinLocal(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
        config?: ContainerLite.IAddChildConfig | boolean
    ): this;

    addLocalMultiple(
        children: Phaser.GameObjects.GameObject[]
    ): this;

    setChildPosition(
        child: Phaser.GameObjects.GameObject,
        x: number,
        y: number
    ): this;

    setChildLocalPosition(
        child: Phaser.GameObjects.GameObject,
        x: number,
        y: number
    ): this;

    setChildRotation(
        child: Phaser.GameObjects.GameObject,
        rotation: number
    ): this;

    setChildAngle(
        child: Phaser.GameObjects.GameObject,
        angle: number
    ): this;

    setChildLocalRotation(
        child: Phaser.GameObjects.GameObject,
        rotation: number
    ): this;

    setChildLocalAngle(
        child: Phaser.GameObjects.GameObject,
        angle: number
    ): this;

    setChildScale(
        child: Phaser.GameObjects.GameObject,
        scaleX: number,
        scaleY: number
    ): this;

    setChildLocalScale(
        child: Phaser.GameObjects.GameObject,
        scaleX: number,
        scaleY: number
    ): this;

    setChildDisplaySize(
        child: Phaser.GameObjects.GameObject,
        width: number,
        height: number
    ): this;

    setChildVisible(
        child: Phaser.GameObjects.GameObject,
        visible: boolean
    ): this;

    setChildAlpha(
        child: Phaser.GameObjects.GameObject,
        alpha: number
    ): this;

    setChildLocalAlpha(
        child: Phaser.GameObjects.GameObject,
        alpha: number
    ): this;

    resetChildState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildPositionState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildRotationState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildScaleState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildAlphaState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildVisibleState(
        child: Phaser.GameObjects.GameObject
    ): this;

    resetChildActiveState(
        child: Phaser.GameObjects.GameObject
    ): this;

    setMask(
        mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask
    ): this;

    clearMask(
        destroyMask?: boolean
    ): this;

    tween(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    tweenChild(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    tweenSelf(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    createTweenChildConfig(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Types.Tweens.TweenBuilderConfig;

    getChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getAllChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    getAllVisibleChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    bfs(
        callback: (child: Phaser.GameObjects.GameObject) => boolean
    ): this;

    dfs(
        callback: (child: Phaser.GameObjects.GameObject) => boolean
    ): this;

    getByName(
        name: string,
        recursive?: boolean
    ): Phaser.GameObjects.GameObject;

    getRandom(): Phaser.GameObjects.GameObject;

    getFirst(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): Phaser.GameObjects.GameObject;

    getAll(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): Phaser.GameObjects.GameObject;

    count(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): this;

    swap(
        child1: Phaser.GameObjects.GameObject,
        child2: Phaser.GameObjects.GameObject
    ): number;

    setAll(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): this;

    setDepth(
        value: number,
        containerOnly?: boolean
    ): this;

    swapDepth(
        containerB: ContainerLite
    ): this;

    incDepth(
        inc: number
    ): this;

    bringToTop(): this;

    moveDepthBelow(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    moveDepthAbove(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    getParent(
        name?: string
    ): ContainerLite;

    getParent(
        gameObject?: Phaser.GameObjects.GameObject,
        name?: string
    ): ContainerLite;

    getTopmostParent(
        gameObject?: Phaser.GameObjects.GameObject
    ): ContainerLite;

    getLocalState(
        child: Phaser.GameObjects.GameObject
    ): ContainerLite.ILocalState;

    addToLayer(
        layer: Phaser.GameObjects.Layer
    ): this;

    addToContainer(
        container: Phaser.GameObjects.Container
    ): this;

    removeFromContainer(): this;

    enableLayer(): this;

    getLayer(): Phaser.GameObjects.Layer;

    snapshot(
        config?: {
            renderTexture?: Phaser.GameObjects.RenderTexture,
            padding?: number,
        }
    ): Phaser.GameObjects.RenderTexture;

    snapshot(
        config?: {
            padding?: number,
            saveTexture: string,
        }
    ): this;

    changeOrigin(
        originX: number,
        originY: number
    ): this;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: ContainerLite.IDrawBoundsConfig,
    ): this;

}