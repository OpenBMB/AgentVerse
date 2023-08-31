import Label from '../../label/Label';
import Sizer from '../../sizer/Sizer';
import { GeneralCreateGameObjectCallbackType } from './GeneralCreateGameObjectCallbackType';
import CreateBackground from './CreateBackground';
import CreateText from './CreateText';

export default BuildLabelConfig;

declare namespace BuildLabelConfig {
    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        orientation?: Sizer.OrientationTypes,
        rtl?: boolean,

        background?: CreateBackground.IConfig,

        iconMask?: boolean,
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        text?: CreateText.IConfig,
        wrapText?: boolean | 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character',
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        squareFitAction?: boolean,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },

        align?: Label.AlignTypes,
    }

    interface ICreators {
        background?: GeneralCreateGameObjectCallbackType,
        text?: GeneralCreateGameObjectCallbackType,
        icon?: GeneralCreateGameObjectCallbackType,
        action?: GeneralCreateGameObjectCallbackType,
    }
}

declare function BuildLabelConfig(
    scene: Phaser.Scene,
    config?: BuildLabelConfig.IConfig,
    creators?: BuildLabelConfig.ICreators,
): Label.IConfig