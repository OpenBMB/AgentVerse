import Sizer from '../../sizer/Sizer';
import RoundRectangle from '../../roundrectangle/RoundRectangle'
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorInputBase;

declare namespace ColorInputBase {
    interface ISwatchConfig extends RoundRectangle.IConfig {
        size?: number,
    }

    interface IConfig extends Sizer.IConfig {
        background?: Phaser.GameObjects.GameObject,

        swatch?: Phaser.GameObjects.GameObject | ISwatchConfig,
        swatchSize?: number,
        squareExpandSwatch?: boolean,

        inputText?: CanvasInput.IConfig,

        valuechangeCallback: (newValue: number, oldValue: number, colorPicker: ColorInputBase) => void,

        value?: number | string
    }
}

declare class ColorInputBase extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: ColorInputBase.IConfig
    );

    setValue(value: number): this;
    value: number;

    setColor(color: number): this;
    color: number;
}