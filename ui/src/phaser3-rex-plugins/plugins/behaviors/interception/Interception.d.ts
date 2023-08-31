import TickTask from '../../utils/componentbase/TickTask';

export default Interception;

declare namespace Interception {

    interface IConfig {
        target?: Phaser.GameObjects.GameObject,
        enable?: boolean
    }
}

declare class Interception extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Interception.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setTarget(
        gameObject?: Phaser.GameObjects.GameObject
    ): this;
    target: Phaser.GameObjects.GameObject | undefined;

    readonly predictedPosition: { x: number, y: number };
    readonly predictedAngle: number;
}