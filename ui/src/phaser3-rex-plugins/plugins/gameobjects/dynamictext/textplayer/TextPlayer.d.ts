// import * as Phaser from 'phaser';
import DynamicText from '../dynamictext/DynamicText';
import Parser from '../../../bracketparser';
import Managers from '../../../logic/runcommands/managers/Managers';

export default TextPlayer;

declare namespace TextPlayer {

    interface IConfigParser {
        delimiters?: string,
        comment?: string,
        translateTagNameCallback?: (s: string) => string,
    }

    interface IConfigTyping {
        speed?: number,
        onTypingStart?: (children: DynamicText.RenderChildTypes[]) => void,
        animation?: {
            duration?: number,
            yoyo?: boolean,
            onStart?: (child: DynamicText.RenderChildTypes) => void,
            onProgress: (child: DynamicText.RenderChildTypes, t: number) => void,
            onComplete: (child: DynamicText.RenderChildTypes) => void
        },
        skipSpace?: boolean,
        minSizeEnable?: boolean,

        fadeOutPage?: (children: DynamicText.RenderChildTypes[])
            => void | Phaser.Events.EventEmitter | Promise<any>;
    }

    interface IConfigImages {
        [name: string]: {
            width?: number,
            height?: number,
            key?: string,
            frame?: string
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

    type NextPageInputTypes = string | ((callback: Function) => void) | null;

    type ClickTrgetTypes = Phaser.GameObjects.GameObject | Phaser.Scene;

    interface IConfig extends DynamicText.IConfig {
        parser?: IConfigParser,

        typing?: IConfigTyping,

        images?: IConfigImages,

        sounds?: Managers.IConfigSounds,

        sprites?: ISpriteGameObjectConfig | false,

        nextPageInput?: NextPageInputTypes,

        clickTarget?: ClickTrgetTypes,

        text?: string
    }

    namespace Events {
        type TypingCompleteCallbackType = () => void;

        type TypingChildCallbackType = (
            child: DynamicText.RenderChildTypes
        ) => void

        type PageStartCallbackType = () => void;

        type PageCompleteCallbackType = () => void;

        type WaitClickCallbackType = () => void;

        type WaitKeyDownCallbackType = (keyName: string) => void;

        type WaitTimeCallbackType = (time: number) => void;

        type WaitMusicCompleteCallbackType = (
            music: Phaser.Sound.BaseSound
        ) => void;

        type WaitCameraEffectCompleteCallbackType = (effectName: string) => void;

        type WaitSpriteActionCompleteCallbackType = (name?: string, prop?: string) => void;

        type WaitCallbackType = (
            callback: () => void
        ) => void;

        type ParseCustomTagOnCallbackType = (parser: Parser, ...values: any) => void;
        type ExecuteCustomTagOnCallbackType = (...values: any) => void;
        type ParseCustomTagOffCallbackType = (parser: Parser) => void;
        type ExecuteCustomTagOffCallbackType = () => void;
    }
}

declare class TextPlayer extends DynamicText {
    constructor(
        scene: Phaser.Scene,
        config?: TextPlayer.IConfig
    );

    addGameObjectManager(config: Managers.IGameObjectConfig): this;

    play(content: string): this;
    playPromise(content: string): Promise<any>;

    showPage(): this;
    typingNextPage(): this;

    pause(): this;
    pauseTyping(): this;
    resume(): this;

    setTypingSpeed(speed: number): this;
    typingSpeed: number;
    setTimeScale(timeScale: number): this;
    timeScale: number;

    readonly isPlaying: boolean;
    readonly isPageTyping: boolean;

    addImage(config: TextPlayer.IConfigImages): this;

    ignoreNextPageInput(enable?: boolean): this;
    setClickTarget(clickTarget: TextPlayer.ClickTrgetTypes): this;
    readonly clickTarget: TextPlayer.ClickTrgetTypes;

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
}