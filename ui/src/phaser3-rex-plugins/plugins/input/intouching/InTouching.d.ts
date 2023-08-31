import ComponentBase from '../../utils/componentbase/ComponentBase';

export default InTouching;

declare namespace InTouching {

    interface IConfig {
        enable?: boolean,
        cooldown?: number,
    }
}

declare class InTouching extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: InTouching.IConfig
    )

    prevIsInTouch: boolean;
    isInTouching: boolean;

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setCooldown(time: number): this;
    cooldownTime: number;
}
