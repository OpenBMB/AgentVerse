import LineProgressCanvas from '../lineprogresscanvas/LineProgressCanvas';

// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default NameValueLabel;

declare namespace NameValueLabel {

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number, iconTop?: number, iconBottom?: number, iconLeft?: number, iconRight?: number,

            name?: number, 
            value?: number,

            bar?: number, barBottom?: number, barLeft?: number, barRight?: number,

            action?: number, actionTop?: number, actionBottom?: number, actionLeft?: number, actionRight?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        icon?: Phaser.GameObjects.GameObject,
        iconMask?: boolean,

        nameText?: Phaser.GameObjects.GameObject,
        valueText?: Phaser.GameObjects.GameObject,
        bar?: Phaser.GameObjects.GameObject | LineProgressCanvas.IConfig,

        action?: Phaser.GameObjects.GameObject,
        actionMask?: boolean,

        valueTextFormatCallback?: (
            value: number,
            min: number,
            max: number
        ) => string,

        align?: {
            text?: 'left' | 'right' | 'center' | number,
            title?: 'left' | 'right' | 'center' | number,
        },

        proportion?: {
            title?: number,
            separator?: number,
            text?: number,
        }
    }
}

declare class NameValueLabel extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: NameValueLabel.IConfig
    );

    nameText: string;
    setNameText(value?:string):this;

    valueText: string;
    setValueText(value?:string):this;

    barValue: number;
    setBarValue(
        value: number,
        min?: number,
        max?: number
    ): this;
    easeBarValueTo(
        value: number,
        min?: number,
        max?: number
    ): this;

    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;

    setValue(
        value: number,
        min: number,
        max: number
    ): this;
    value: number;
    minValue: number;
    maxValue: number;
}