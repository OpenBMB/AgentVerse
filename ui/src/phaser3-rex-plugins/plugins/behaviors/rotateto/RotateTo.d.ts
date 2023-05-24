import TickTask from '../../utils/componentbase/TickTask';

export default RotateTo;

declare namespace RotateTo {

    type DirectionType = 0 | 1 | 2 | 'cw' | 'ccw';

    interface IConfig {
        enable?: boolean,
        speed?: number,
        timeScale?: number
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            rotateTo: RotateTo
        ) => void;
    }
}

declare class RotateTo extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: RotateTo.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    rotateTowardsPosition(
        x: number,
        y: number,
        direction?: RotateTo.DirectionType,
        speed?: number
    ): this;

    rotateTo(
        degrees: number,
        direction?: RotateTo.DirectionType,
        speed?: number
    ): this;

    setSpeed(speed: number): this;
    speed: number;
}