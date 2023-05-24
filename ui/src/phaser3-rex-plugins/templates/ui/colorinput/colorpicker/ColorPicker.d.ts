import Sizer from '../../sizer/Sizer';

export default ColorPicker;

declare namespace ColorPicker {
    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        hPalette?: {
            position?: 0 | 1 | 2 | 3 | 'bottom' | 'left' | 'top' | 'right',
            size?: number, width?: number, height?: number,
        },

        svPalette?: {
            width?: number, height?: number,
        },

        valuechangeCallback: (newValue: number, oldValue: number, colorPicker: ColorPicker) => void,
        valuechangeCallbackScope?: Object,

        value?: number,
    }
}

declare class ColorPicker extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorPicker.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;


}