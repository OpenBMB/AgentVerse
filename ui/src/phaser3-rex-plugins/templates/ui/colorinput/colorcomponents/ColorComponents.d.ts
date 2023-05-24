import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import Label from '../../label/Label';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorComponents;

declare namespace ColorComponents {

    interface IFormatLabelConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,
        },

        background?: RoundRectangle.IConfig,

        text?: Phaser.GameObjects.TextStyle,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        align?: Label.AlignTypes,
    }

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        formatLabel?: Phaser.GameObjects.GameObject | IFormatLabelConfig;

        inputText0?: Phaser.GameObjects.GameObject,
        inputText1?: Phaser.GameObjects.GameObject,
        inputText2?: Phaser.GameObjects.GameObject,
        inputText?: CanvasInput.IConfig,

        proportion?: {
            formatLabel?: number,

        },

        valuechangeCallback: (newValue: number, oldValue: number, colorComponents: ColorComponents) => void,

        value?: number
    }
}

declare class ColorComponents extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorComponents.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;

    setColorFormat(colorFormat: 'RGB' | 'HSV'): this;
    toggleColorFormat(): this;
    colorFormat: 'RGB' | 'HSV';
}