// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer.js';

export default GridSizer;

declare namespace GridSizer {
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

    type CreateCellContainerCallbackType = (
        scene: Phaser.Scene,
        x: number, y: number,
        config: {
            column?: number, row?: number,

            align?: GridSizer.AlignTypes,
            padding?: GridSizer.PaddingTypes,
            expand?: boolean,
            key?: string
        }
    ) => Phaser.GameObjects.GameObject;

    interface IConfig extends BaseSizer.IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        column?: number,
        row?: number,

        columnProportions?: number | number[],
        rowProportions?: number | number[],

        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            column?: number | number[],
            row?: number | number[],

            indentLeftOdd?: number, indentLeftEven?: number,
            indentTopOdd?: number, indentTopEven?: number,
        },

        createCellContainerCallback?: CreateCellContainerCallbackType
    }

}


declare class GridSizer extends BaseSizer {
    sizerChildren: (Phaser.GameObjects.GameObject | null)[];

    constructor(
        scene: Phaser.Scene,
        config?: GridSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: GridSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: GridSizer.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        column: number, row: number,
        config?: GridSizer.IConfig
    );

    setColumnProportion(columnIndex: number, proportion: number): this;
    setRowProportion(rowIndex: number, proportion: number): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: {
            column?: number | undefined,
            row?: number | undefined | true,
            align?: GridSizer.AlignTypes,
            padding?: GridSizer.PaddingTypes,
            expand?: boolean,
            key?: string
        }
    ): this;

    add(
        gameObject: Phaser.GameObjects.GameObject,
        columnIndex?: number | undefined,
        rowIndex?: number | undefined | true,
        align?: GridSizer.AlignTypes,
        padding?: GridSizer.PaddingTypes,
        expand?: boolean,
        key?: string
    ): this;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    removeAt(
        columnIndex: number,
        rowIndex: number,
        destroyChild?: boolean
    ): this;

    removeAll(
        destroyChild?: boolean
    ): this;

    clear(
        destroyChild?: boolean
    ): this;

    columnCount: number;
    rowCount: number;

    resetGrid(
        column: number, row: number,
        columnProportions?: number | number[],
        rowProportions?: number | number[],
        space?: {
            column?: number | number[],
            row?: number | number[],
        }
    ): this;
}