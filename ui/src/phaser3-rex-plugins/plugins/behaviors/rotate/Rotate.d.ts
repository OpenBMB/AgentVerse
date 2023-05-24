import TickTask from '../../utils/componentbase/TickTask';

export default Rotate;

declare namespace Rotate {

    interface IConfig {
        enable?: boolean,
        speed?: number,
        timeScale?: number
    }
}

declare class Rotate extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Rotate.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setSpeed(speed: number): this;
    speed: number;
}