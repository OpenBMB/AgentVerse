import CheckboxShape from './CheckboxShape';
import Click from '../../../input/button/Button';

export default Checkbox;

declare namespace Checkbox {
    interface IConfig extends CheckboxShape.IConfig {
        readOnly?: boolean;
        input?: Click.IConfig,
    }
}

declare class Checkbox extends CheckboxShape {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        color?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: Checkbox.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: Checkbox.IConfig
    );

    setReadOnly(readOnly?: boolean): this;
    readOnly: boolean;
}