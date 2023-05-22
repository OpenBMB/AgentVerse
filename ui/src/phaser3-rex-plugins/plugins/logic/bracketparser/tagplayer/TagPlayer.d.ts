import Managers from '../../runcommands/managers/Managers';

export default TagPlayer;

declare namespace TagPlayer {
    interface IConfigParser {
        delimiters?: string,
        comment?: string,
        translateTagNameCallback?: (s: string) => string,
    }

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

    interface ISpriteGameObjectConfig {
        createGameObject?: 'sprite' | 'image' | Managers.CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    interface ITextGameObjectConfig {
        createGameObject?: Managers.CreateGameObjectCallbackType,

        fade?: number | {
            mode?: 0 | 1 | 'tint' | 'alpha',
            time?: number
        },

        viewportCoordinate?: boolean | {
            enable?: boolean,
            viewport?: Phaser.Geom.Rectangle
        }
    }

    type NextPageInputTypes = string | ((callback: Function) => void) | null;

    type ClickTrgetTypes = Phaser.GameObjects.GameObject | Phaser.Scene;

    interface IConfig {
        parser?: IConfigParser,

        sounds?: Managers.IConfigSounds,

        sprites?: ISpriteGameObjectConfig | false,

        texts?: ITextGameObjectConfig | false,

        nextPageInput?: NextPageInputTypes,

        clickTarget?: ClickTrgetTypes,
    }
}

declare class TagPlayer extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: TagPlayer.IConfig
    );

    destroy(fromScene?: boolean): this;

    addGameObjectManager(config: Managers.IGameObjectConfig): this;

    play(commands: string): this;
    playPromise(commands: string): Promise<any>;

    pause(): this;
    pauseUntilEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    resume(): this;

    isPlaying: boolean;

    setTimeScale(timeScale: number): this;
    timeScale: number;

    setClickTarget(clickTarget: TagPlayer.ClickTrgetTypes): this;
    readonly clickTarget: TagPlayer.ClickTrgetTypes;

    setTargetCamera(camera: Phaser.Cameras.Scene2D.BaseCamera): this;
    readonly targetCamera: Phaser.Cameras.Scene2D.BaseCamera;

    getGameObject(
        goType: string,
        name: string
    ): Phaser.GameObjects.GameObject;
    getGameObject(
        goType: string,
    ): { [name: string]: Phaser.GameObjects.GameObject }
    addGameObject(
        goType: string,
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    setDataEnabled(): this;
    setData(key: string | object, data?: any): this;
    incData(key: string | object, data?: any): this;
    toggleData(key: string | object): this;
    getData(key: string | string[]): any;

}