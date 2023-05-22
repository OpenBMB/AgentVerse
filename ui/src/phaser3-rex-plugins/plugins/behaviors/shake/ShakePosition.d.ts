import TickTask from '../../utils/componentbase/TickTask';

export default ShakePosition;

declare namespace ShakePosition {

    type ModeType = 0 | 1 | 'effect' | 'behavior';    
    type MagnitudeModeType = 0 | 1 | 'constant' | 'decay';
    type AixsModeType = 0 | 1 | 2 | 'both' | 'h&v' | 'horizontal' | 'h' | 'vertical' | 'v';

    interface IConfig {
        mode?: ModeType,
        duration?: number,
        magnitude?: number,
        magnitudeMode?: MagnitudeModeType,
        axis?: AixsModeType,
    }

    namespace Events {
        type CompleteCallbackType = (
            gameObject: Phaser.GameObjects.GameObject,
            shake: ShakePosition
        ) => void;
    }

}

declare class ShakePosition extends TickTask {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: ShakePosition.IConfig
    )

    setEnable(enable?: boolean): this;
    enable: boolean;

    shake(duration?: number, magnitude?: number): this;
    shake(config: {
        duration?: number,
        magnitude?: number,
    }): this;

    setMode(mode: ShakePosition.ModeType): this;
    mode: number;

    setDuration(duration: number): this;
    duration: number;

    setMagnitude(magnitude: number): this;
    magnitude: number;

    setMagnitudeMode(magnitudeMode: ShakePosition.MagnitudeModeType): this;
    magnitudeMode: number;

    setAxisMode(axisMode: ShakePosition.AixsModeType): this;
    axisMode: number;

}