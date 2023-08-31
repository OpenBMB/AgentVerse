export default DropDown;

declare namespace DropDown {
    type TransitCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        duration: number
    ) => void;

    interface IConfig {

        duration?: {
            in?: number,
            out?: number,
        },

        transitIn?: TransitCallbackType,
        transitOut?: TransitCallbackType,

        expandDirection?: 0 | 1 | 'down' | 'up',

        alignTarget?: Phaser.GameObjects.GameObject,
        alignTargetX?: Phaser.GameObjects.GameObject,
        alignTargetY?: Phaser.GameObjects.GameObject,
        alignOffsetX?: number,
        alignOffsetY?: number,
        alignSide?: string,

        bounds?: Phaser.Geom.Rectangle,

        touchOutsideClose?: boolean,

        anyTouchClose?: boolean,

        destroy?: boolean,
    }
}

declare class DropDown extends Phaser.Events.EventEmitter {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: DropDown.IConfig,
    )

    requestClose(closeEventData: any): this;
}