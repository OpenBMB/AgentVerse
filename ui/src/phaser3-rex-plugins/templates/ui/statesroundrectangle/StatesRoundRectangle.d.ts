import RoundRectangle from '../roundrectangle/RoundRectangle';

export default StatesRoundRectangle;

declare namespace StatesRoundRectangle {
    interface IConfig extends RoundRectangle.IConfig {
        'active.color'?: number,
        'active.alpha'?: number,
        'active.strokeColor'?: number,
        'active.strokeAlpha'?: number,
        'active.strokeWidth'?: number,
        'active.radius'?: number | RoundRectangle.IRadiusConfig | ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),

        'hover.color'?: number,
        'hover.alpha'?: number,
        'hover.strokeColor'?: number,
        'hover.strokeAlpha'?: number,
        'hover.strokeWidth'?: number,
        'hover.radius'?: number | RoundRectangle.IRadiusConfig | ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),

        'disable.color'?: number,
        'disable.alpha'?: number,
        'disable.strokeColor'?: number,
        'disable.strokeAlpha'?: number,
        'disable.strokeWidth'?: number,
        'disable.radius'?: number | RoundRectangle.IRadiusConfig | ({
            radius?: (number | RoundRectangle.IRadiusConfig),
            iteration?: number
        }),

    }
}

declare class StatesRoundRectangle extends RoundRectangle {
    constructor(
        scene: Phaser.Scene,
        config?: StatesRoundRectangle.IConfig
    )

    setActiveState(enable?: boolean): this;
    setHoverState(enable?: boolean): this;
    setDisableState(enable?: boolean): this;
}