import ComponentBase from '../../utils/componentbase/ComponentBase.js';

export default Button;

declare namespace Button {

    interface IConfig {
        mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
        clickInterval?: number,
        threshold?: number,
        enable?: boolean,

        eventEmitter?: boolean | Phaser.Events.EventEmitter
    }

    namespace Events {
        type ClickCallbackType =
            (
                button: Button,
                gameObject: Phaser.GameObjects.GameObject,
                pointer: Phaser.Input.Pointer,
                event: Phaser.Types.Input.EventData
            ) => void;

        type EnableCallbackType = (
            button: Button,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

        type DisableCallbackType = (
            button: Button,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    }
}

declare class Button extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Button.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setMode(
        mode?: 0 | 1 | 'pointerdown' | 'press' | 'pointerup' | 'release'
    ): this;

    setClickInterval(interval: number): this;
}