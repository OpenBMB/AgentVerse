// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default HolyGrail;

declare namespace HolyGrail {

    type HAlignTypes = number | 'left' | 'center' | 'right';
    type VAlignTypes = number | 'top' | 'center' | 'bottom';

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            header?: number | { left?: number, right?: number, top?: number, bottom?: number },
            leftSide?: number | { left?: number, right?: number, top?: number, bottom?: number },
            content?: { left?: number, right?: number, top?: number, bottom?: number },
            rightSide?: number | { left?: number, right?: number, top?: number, bottom?: number },
            footer?: number | { left?: number, right?: number, top?: number, bottom?: number },
        };

        background?: Phaser.GameObjects.GameObject,

        header?: Phaser.GameObjects.GameObject,

        leftSide?: Phaser.GameObjects.GameObject,

        content?: Phaser.GameObjects.GameObject,

        rightSide?: Phaser.GameObjects.GameObject,

        footer?: Phaser.GameObjects.GameObject,

        layoutMode?: 0 | 1 | 2 | 3 | 'FFF' | 'LFF' | 'FFR' | 'LFR',

        proportion?: {
            header?: number,
            leftSide?: number,
            content?: number,
            rightSide?: number,
            footer?: number,
        },

        expand?: {
            header?: boolean,
            leftSide?: boolean,
            content?: boolean,
            rightSide?: boolean,
            footer?: boolean,
        },

        align?: {
            header?: HAlignTypes,
            leftSide?: VAlignTypes,
            content?: HAlignTypes | VAlignTypes,
            rightSide?: VAlignTypes,
            footer?: HAlignTypes,
        },

    }
}

declare class HolyGrail extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: HolyGrail.IConfig
    );

}