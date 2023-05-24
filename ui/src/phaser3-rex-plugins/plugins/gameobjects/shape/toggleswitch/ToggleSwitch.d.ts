import ToggleSwitchShape from './ToggleSwitchShape';
import Click from '../../../input/button/Button';

export default ToggleSwitch;

declare namespace ToggleSwitch {
    interface IConfig extends ToggleSwitchShape.IConfig {
        readOnly?: boolean;
        input?: Click.IConfig,
    }
}

declare class ToggleSwitch extends ToggleSwitchShape {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        color?: number,
        config?: ToggleSwitch.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: ToggleSwitch.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: ToggleSwitch.IConfig
    );

    setReadOnly(readOnly?: boolean): this;
    readOnly: boolean;
}