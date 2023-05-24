// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';

export default OverlapSizer;

declare namespace OverlapSizer {
    type AlignTypes = number | 'center' | 'left' | 'right' | 'top' | 'bottom' |
        'left-top' | 'left-center' | 'left-bottom' |
        'center-top' | 'center-center' | 'center-bottom' |
        'right-top' | 'right-center' | 'right-bottom';

    type PaddingTypes = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    };

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    }
}

declare class OverlapSizer extends BaseSizer {
    sizerChildren: { [name: string]: Phaser.GameObjects.GameObject };

    constructor(
        scene: Phaser.Scene,
        config?: OverlapSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: OverlapSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: OverlapSizer.IConfig
    );

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            key?: string,

            align?: OverlapSizer.AlignTypes,
            offsetX?: number,
            offsetY?: number,

            padding?: OverlapSizer.PaddingTypes,

            expand?: boolean |
            {
                width?: boolean,
                height?: boolean,
            },

            minWidth?: number,

            minHeight?: number,
        }
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        key?: string,
        align?: OverlapSizer.AlignTypes,
        padding?: OverlapSizer.PaddingTypes,
        expand?: boolean |
        {
            width?: boolean,
            height?: boolean,
        },
        minWidth?: number,
        minHeight?: number,
        offsetX?: number,
        offsetY?: number,
    ): this;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    remove(
        key: string,
        destroyChild?: boolean
    ): this;

    removeAll(
        destroyChild?: boolean
    ): this;

    clear(
        destroyChild?: boolean
    ): this;

    childToKey(
        gameObject: Phaser.GameObjects.GameObject
    ): string;
}