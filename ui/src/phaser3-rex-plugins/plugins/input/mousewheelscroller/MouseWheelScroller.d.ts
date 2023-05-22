import ComponentBase from '../../utils/componentbase/ComponentBase';

export default MouseWheelScroller;

declare namespace MouseWheelScroller {
    interface IConfig {
        focus?: boolean,
        speed?: number,
        enable?: boolean
    }

    namespace Events {
        type ScrollCallbackType = (
            inc: number,
            gameObject: Phaser.GameObjects.GameObject,
            scroller: MouseWheelScroller
        ) => void;
    }
}

declare class MouseWheelScroller extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelScroller.IConfig
    )

    setSpeed(speed: number): this;
    speed: number;

    setEnable(enable?: boolean): this;
    enable: boolean;
}