import BobBase from './bobbase/BobBase';

export default GOManager;

declare namespace GOManager {

    type CreateBobCallbackType = (
        GOManager: GOManager,
        gameObject: Phaser.GameObjects.GameObject,
        name: string
    ) => BobBase;

    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject;

    interface IConfig {
        createBob?: CreateBobCallbackType,

        createGameObject?: CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }
}

declare class GOManager extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: GOManager.IConfig
    )

    destroy(fromScene?: boolean): void;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setCreateBobCallback(callback?: GOManager.CreateBobCallbackType): this;
    setCreateGameObjectCallback(callback?: GOManager.CreateGameObjectCallbackType): this;

    setGOFadeTime(time: number): this;

    isEmpty: boolean;

    has(name: string): boolean;

    get(name: string): BobBase;
    getGO(name: string): Phaser.GameObjects.GameObject;

    addGO(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    add(
        name: string,
        ...args: any[]
    ): this;

    forEachGO(
        callback: (
            gameObject: Phaser.GameObjects.GameObject,
            name: string,
            goManager: GOManager
        ) => boolean,
        scope?: Object
    ): this;

    remove(name: string): this;
    removeAll(): this;
    clear(destroyChild?: boolean): this;

    hasProperty(
        name: string,
        property: string,
    ): boolean;

    setProperty(
        name: string,
        property: string,
        value: any
    ): this;

    easeProperty(
        name: string,
        property: string,
        value: number,
        duration?: number,
        ease?: string,
        repeat?: number,
        isYoyo?: boolean,
        onComplete?: (
            gameObject: Phaser.GameObjects.GameObject,
            property: string
        ) => void
    ): this;

    call(
        name: string,
        methodName: string,
        ...parameters: any[]
    ): this;

    hasTweenTask(
        name: string,
        property: string
    ): boolean;

    getTweenTask(
        name: string,
        property: string
    ): Phaser.Tweens.Tween | null;

    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number
    ): this;
    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: {
            color?: number,
            lineWidth?: number
        }
    ): this;
}