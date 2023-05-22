import ComponentBase from '../../utils/componentbase/ComponentBase';

export default ClickOutside;

declare namespace ClickOutside {

    interface IConfig {
        mode?: 0 | 1 | 'pointerdown' | 'pointerup' | 'press' | 'release',
        clickInterval?: number,
        enable?: boolean,

        eventEmitter?: boolean | Phaser.Events.EventEmitter
    }

    namespace Events {
        type ClickOutsideCallbackType =
            (
                button: ClickOutside,
                gameObject: Phaser.GameObjects.GameObject,
                pointer: Phaser.Input.Pointer,
                event: Phaser.Types.Input.EventData
            ) => void;

        type EnableCallbackType = (
            button: ClickOutside,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

        type DisableCallbackType = (
            button: ClickOutside,
            gameObject: Phaser.GameObjects.GameObject,
        ) => void;

    }
}

declare class ClickOutside extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ClickOutside.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setMode(
        mode?: 0 | 1 | 'pointerdown' | 'press' | 'pointerup' | 'release'
    ): this;

    setClickInterval(interval: number): this;
}