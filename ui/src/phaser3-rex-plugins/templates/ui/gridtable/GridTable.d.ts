// import * as Phaser from 'phaser';
import Scrollable from '../utils/scrollable/Scrollable';
import GridTableCore from '../../../plugins/gridtable'

export default GridTable;

declare namespace GridTable {

    type CreateCellContainerCallbackType = (
        cell: GridTableCore.CellData,
        cellContainer: Phaser.GameObjects.GameObject | null
    ) => Phaser.GameObjects.GameObject | null;

    interface IConfig extends Scrollable.IConfig {
        space?: {
            left?: number, right?: number, top?: number, bottom?: number,

            table?: number | {
                left?: number, right?: number, top?: number, bottom?: number,
            },

            header?: number,
            footer?: number,
        },

        scrollMode?: GridTableCore.ScrollModeType,

        table: {
            width?: number | undefined,
            height?: number | undefined,

            cellWidth?: number | undefined,
            cellHeight?: number | undefined,
            columns?: number,
            mask?: GridTableCore.MaskConfig,
            interactive?: boolean,
            reuseCellContainer?: boolean,
        },

        createCellContainerCallback: CreateCellContainerCallbackType,

        items: unknown[]
    }

}

declare class GridTable extends Scrollable {
    constructor(
        scene: Phaser.Scene,
        config?: GridTable.IConfig
    );

    setItems(items?: unknown[]): this;
    refresh(): this;
    updateVisibleCell(cellIndex: number): this;

    getCell(cellIndex: number): GridTableCore.CellData;
    getCellContainer(cellIndex: number): Phaser.GameObjects.GameObject | null;
    startRowIndex: number;

    scrollToRow(rowIndex: number): this;
    scrollToNextRow(rowCount?: number): this;
}