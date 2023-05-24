import ColorInputBase from '../colorinputbase/ColorInputBase';
import RoundRectangle from '../../roundrectangle/RoundRectangle';
import ColorComponents from '../colorcomponents/ColorComponents';
import CanvasInput from '../../canvasinput/CanvasInput';

export default ColorInput;

declare namespace ColorInput {
    type TransitCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        duration: number
    ) => void;

    interface IConfig extends ColorInputBase.IConfig {
        colorPicker?: {
            width?: number, height?: number,

            background?: RoundRectangle.IConfig,
            createBackgroundCallback: (
                scene: Phaser.Scene,
            ) => Phaser.GameObjects.GameObject,

            hPalettePosition?: 0 | 1 | 2 | 3 | 'bottom' | 'left' | 'top' | 'right',

            expandDirection?: 0 | 1 | 'down' | 'up',

            easeIn?: number, easeOut?: number,

            transitIn?: TransitCallbackType,
            transitOut?: TransitCallbackType,

            bounds?: Phaser.Geom.Rectangle;

            space?: {
                left?: number, right?: number, top?: number, bottom?: number,
                item?: number,
            }
        },

        colorComponents?: {
            height?: number,

            formatLabel?: ColorComponents.IFormatLabelConfig,

            inputText?: CanvasInput.IConfig,

            space?: {
                left?: number, right?: number, top?: number, bottom?: number,
            },
        }
    }
}

declare class ColorInput extends ColorInputBase {
    constructor(
        scene: Phaser.Scene,
        config?: ColorInput.IConfig
    );
}