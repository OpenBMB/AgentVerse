import TickTask from '../../utils/componentbase/TickTask';

export default Step;

declare namespace Step {
    interface IConfig {
        enable?: boolean,
        stepLength?: number,
    }
}

declare class Step extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Step.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    setStepLength(stepLength: number): this;
    stepLength: number;

    cancelStep(): this;

}