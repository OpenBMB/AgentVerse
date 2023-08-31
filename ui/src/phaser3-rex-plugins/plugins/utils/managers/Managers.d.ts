import GOManager from '../gameobject/gomanager/GOManager';
import SoundManager from '../audio/soundmanager/SoundManager';
import WaitEventManager from './waiteventmanager/WaitEventManager';

export default Managers;

declare namespace Managers {
    interface IConfigSounds {
        bgm?: {
            initial?: string,
            loop?: boolean,
            fade?: number
        },
        bgm2?: {
            initial?: string,
            loop?: boolean,
            fade?: number
        }
    }

    type CreateGameObjectCallbackType = (
        scene: Phaser.Scene,
        ...args: any[]
    ) => Phaser.GameObjects.GameObject

    interface IGameObjectConfig {
        name: string,

        createGameObject: CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface IDrawBoundsConfig {
        color?: number,
        lineWidth?: number
    }

    interface IConfig {
        sounds?: IConfigSounds
    }
}

declare class Managers extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: Managers.IConfig,
    );

    gameObjectManagers: { [name: string]: GOManager };

    soundManager: SoundManager;

    waitEventManager: WaitEventManager;

    destroy(fromScene?: boolean): this;

    addGameObjectManager(config: Managers.IGameObjectConfig): this;

    getGameObjectManager(
        managerName: string | null | undefined,
        name?: string
    ): GOManager;

    getGameObjectManagerNames(): string[];

    getGameObjectManagerName(gameObjectName: string): string;

    createGameObject(
        goType: string, name: string,
        ...params: any[]
    ): this;

    destroyGameObject(goType: string | undefined, name: string): this;

    callGameObjectMethod(
        goType: string | undefined, name: string,
        methodName: string, ...params: any[]
    ): this;

    setGameObjectProperty(
        goType: string | undefined, name: string,
        prop: string, value: any,
    ): this;

    easeGameObjectProperty(
        goType: string | undefined, name: string,
        prop: string, value: any,
        duration?: number, ease?: string, repeat?: number, isYoyo?: boolean
    ): this;

    getGameObjectTweenTask(
        goType: string | undefined, name: string,
        property: string | undefined
    ): Phaser.Tweens.Tween | null;

    getGameObject(
        goType: string | undefined, name: string,
    ): Phaser.GameObjects.GameObject;

    getGameObject(
        goType: string, name: { [name: string]: string }
    ): { [name: string]: Phaser.GameObjects.GameObject };

    addGameObject(
        goType: string, name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    drawGameObjectsBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;
    drawGameObjectsBounds(
        goTypes: string[],
        graphics: Phaser.GameObjects.Graphics,
        config?: number | Managers.IDrawBoundsConfig,
    ): this;

    setTimeScale(value: number): this;
    getTimeScale(value: number): this;

}