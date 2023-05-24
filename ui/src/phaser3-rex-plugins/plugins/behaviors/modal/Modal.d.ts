export default Modal;

declare namespace Modal {
    type TransitCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        duration: number
    ) => void;

    interface IConfig {
        cover?: {
            color?: number,
            alpha?: number,
            transitIn?: TransitCallbackType | null,
            transitOut?: TransitCallbackType | null,
        },

        manualClose?: boolean,

        clickOutsideClose?: boolean,

        anyTouchClose?: boolean,

        duration?: {
            in?: number,
            hold?: number,
            out?: number,
        },

        transitIn?: 0 | 1 | 'popUp' | 'fadeIn' | TransitCallbackType,

        transitOut?: 0 | 1 | 'scaleDown' | 'fadeOut' | TransitCallbackType,

        destroy?: boolean,

        openOnStart?: boolean,
    }
}

declare class Modal extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Modal.IConfig
    );

    requestClose(
        closeEventData?: unknown
    ): this;

    setCoverTransitInCallback(callback?: Modal.TransitCallbackType): this;
    setCoverTransitOutCallback(callback?: Modal.TransitCallbackType): this;
}