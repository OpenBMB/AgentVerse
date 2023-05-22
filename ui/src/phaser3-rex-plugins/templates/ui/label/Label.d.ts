// import * as Phaser from 'phaser';
import Sizer from '../sizer/Sizer';

export default Label;

declare namespace Label {

    type AlignTypes = 'left' | 'top' | 'right' | 'bottom' | 'center';

    interface IConfig extends Sizer.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            icon?: number,
            text?: number,
        },

        background?: Phaser.GameObjects.GameObject,

        icon?: Phaser.GameObjects.GameObject,
        iconMask?: boolean,
        squareFitIcon?: boolean,
        iconSize?: number, iconWidth?: number, iconHeight?: number,

        text?: Phaser.GameObjects.GameObject,
        expandTextWidth?: boolean,
        expandTextHeight?: boolean,

        action?: Phaser.GameObjects.GameObject,
        squareFitAction?: boolean,
        actionMask?: boolean,
        actionSize?: number, actionWidth?: number, actionHeight?: number,

        align?: AlignTypes,
    }

    interface IResetDisplayContentConfig {
        text?: string,

        icon?: string | Phaser.Textures.Texture,
        iconFrame?: string | number,
        iconSize?: number,

        action?: string | Phaser.Textures.Texture,
        actionFrame?: string | number,
        actionSize?: number,
    }
}

declare class Label extends Sizer {
    constructor(
        scene: Phaser.Scene,
        config?: Label.IConfig
    );

    text: string;
    setText(text: string): this;
    appendText(
        text: string | number | string[],
        addCR?: boolean
    ): this;

    setTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly frame: Phaser.Textures.Frame;

    setIconTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;

    setIconSize(
        width?: number,
        height?: number
    ): this;
    iconWidth: number;
    iconHeight: number;

    setActionTexture(
        key: string | Phaser.Textures.Texture,
        frame?: string | number
    ): this;
    readonly actionTexture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    readonly actionFrame: Phaser.Textures.Frame;

    setActionSize(
        width?: number,
        height?: number
    ): this;
    actionWidth: number;
    actionHeight: number;

    resetDisplayContent(
        config?: string | Label.IResetDisplayContentConfig
    ): this;

}