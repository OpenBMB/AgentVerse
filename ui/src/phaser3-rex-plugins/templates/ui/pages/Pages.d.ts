// import * as Phaser from 'phaser';
import OverlapSizer from '../overlapsizer/OverlapSizer';


export default Pages;

declare namespace Pages {

    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    type PaddingTypes = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    };

    interface IConfig extends OverlapSizer.IConfig {
        fadeIn?: number,

        swapMode?: 0 | 1 | 'invisible' | 'destroy',
    }

}

declare class Pages extends OverlapSizer {
    constructor(
        scene: Phaser.Scene,
        config?: Pages.IConfig
    );

    setSwapMode(
        mode: 0 | 1 | 'invisible' | 'destroy'
    ): this;

    addPage(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            key?: string,

            align?: Pages.AlignTypes,

            padding?: Pages.PaddingTypes,

            expand: boolean |
            {
                width?: boolean,
                height?: boolean,
            },

            minWidth?: number,

            minHeight?: number
        }
    ): this;

    swapPage(
        key: string,
        fadeInDuration?: number
    ): this;
    currentKey: string;
    readonly previousKey: string;
    keys: string[];

    getPage(key: string): Phaser.GameObjects.GameObject;
    readonly currentPage: Phaser.GameObjects.GameObject;
    readonly previousPage: Phaser.GameObjects.GameObject;
}