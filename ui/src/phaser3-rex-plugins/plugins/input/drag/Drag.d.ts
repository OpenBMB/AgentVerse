import ComponentBase from '../../utils/componentbase/ComponentBase';

export default Drag;

declare namespace Drag {
    type AixsModeType = 0 | 1 | 2 | 'both' | 'h&v' | 'horizontal' | 'h' | 'vertical' | 'v';

    interface IConfig {
        enable?: boolean,
        axis?: AixsModeType,
        rotation?: number
    }
}

declare class Drag extends ComponentBase {
    constructor(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Drag.IConfig
    )

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setAxisRotation(rad?: number): this;
    axisRotation: number;

    setAxisMode(axisMode: Drag.AixsModeType): this;
    axisMode: number;

    drag(): this;
    dragend(): this;

}
