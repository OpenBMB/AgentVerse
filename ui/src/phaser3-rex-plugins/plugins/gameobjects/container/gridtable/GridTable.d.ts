import ContainerLite from '../../container/containerlite/ContainerLite';

export default GridTable;

declare namespace GridTable {

    type ScrollModeType = 0 | 1 | 'v' | 'vertical' | 'h' | 'horizontal';

    interface CellData {
        scene: Phaser.Scene,
        width: number,
        height: number,
        deltaWidth: number,
        deltaHeight: number,
        item: unknown,
        index: number,

        setHeight(value: number): void,
        setDeltaHeight(value: number): void,
        setWidth(value: number): void,
        setDeltaWidth(value: number): void,

        setContainer(cellContainer?: Phaser.GameObjects.GameObject | null): void,
        getContainer(): Phaser.GameObjects.GameObject | null,
        popContainer(): Phaser.GameObjects.GameObject | null,
        destroyContainer(): this,
    }

    type CellVisibleCallbackType = (
        cell: CellData,
        cellContainer: Phaser.GameObjects.GameObject | null,
        table: GridTable
    ) => void;

    type CellInvisibleCallbackType = (
        cell: CellData
    ) => void;

    type MaskUpdateModeType = 0 | 1 | 'update' | 'everyTick';
    type MaskConfig = {
        padding?: number,
        updateMode?: MaskUpdateModeType
    } |
        boolean;


    interface IConfig {
        cellsCount?: number,
        columns?: number,
        cellHeight?: number,
        cellWidth?: number,

        cellVisibleCallback: CellVisibleCallbackType,
        cellVisibleCallbackScope?: Object,
        reuseCellContainer?: boolean,

        cellInvisibleCallback: CellInvisibleCallbackType,
        cellInvisibleCallbackScope: undefined,

        clamplTableOXY?: boolean,
        scrollMode?: ScrollModeType,
        mask?: MaskConfig,
        enableLayer?: boolean,
    }

    namespace Events {
        type CellvisibleCallbackType = (
            cell: CellData,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        type CellInvisibleCallbackType = (cell: CellData) => void;

        type CellHeightchange = (
            cell: CellData,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;

        type CellWidthchange = (
            cell: CellData,
            cellContainer: Phaser.GameObjects.GameObject | null,
            table: GridTable
        ) => void;
    }
}

declare class GridTable extends ContainerLite {

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config: GridTable.IConfig
    );

    resize(width: number, height: number): this;

    setTableOY(oy: number): this;
    addTableOY(dy: number): this;
    setTableOX(ox: number): this;
    addTableOX(dx: number): this;
    setTableOXY(ox: number, oy: number): this;
    addTableOXY(dx: number, dy: number): this;
    tableOY: number;
    tableOX: number;

    setTableOYByPercentage(t: number): this;
    t: number;
    getTableOYPercentage(): number;
    scrollToBottom(): this;

    scrollToRow(rowIndex: number): this;
    scrollToNextRow(rowCount?: number): this;
    startRowIndex: number;

    updateTable(refresh?: boolean): this;
    updateVisibleCell(cellIdx: number): this;

    setGridSize(colCount: number, rowCount: number): this;
    setCellsCount(count: number): this;
    readonly cellsCount: number;
    readonly columnCount: number;

    readonly tableHeight: number;
    readonly tableWidth: number;

    readonly topTableOY: number;
    readonly bottomTableOY: number;
    readonly leftTableOX: number;
    readonly rightTableOX: number;

    getCell(cellIndex: number): GridTable.CellData;

    pointToCellIndex(x: number, y: number): number;

    setCellHeight(cellIndex: number, cellHeight: number): this;
    setCellWidth(cellIndex: number, cellWidth: number): this;

    iterateVisibleCell(
        callback: (cell: GridTable.CellData) => void
    ): this;

    eachVisibleCell(
        callback: (cell: GridTable.CellData) => void
    ): this;
}