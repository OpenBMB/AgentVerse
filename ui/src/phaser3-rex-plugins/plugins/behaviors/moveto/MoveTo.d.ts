import TickTask from '../../utils/componentbase/TickTask';

export default MoveTo;

declare namespace MoveTo {

    interface IConfig {
        speed?: number,
        rotateToTarget?: boolean
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            moveTo: MoveTo
        ) => void;
    }
}

declare class MoveTo extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: MoveTo.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    moveTo(x: number, y: number): this;
    moveTo(config: {
        x: number,
        y: number,
        speed?: number
    }): this;
    moveFrom(x: number, y: number): this;
    moveFrom(config: {
        x: number,
        y: number,
        speed?: number
    }): this;
    moveToward(angle: number, distance: number): this;

    setSpeed(speed: number): this;
    speed: number;

    setRotateToTarget(enable?: boolean): this;
    rotateToTarget: boolean;
}