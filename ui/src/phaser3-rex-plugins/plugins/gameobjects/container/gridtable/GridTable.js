import ContainerLite from '../../container/containerlite/ContainerLite.js';
import Table from './table/Table.js';
import Methods from './methods/Methods.js';

const Group = Phaser.GameObjects.Group;
const Set = Phaser.Structs.Set;
const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends ContainerLite {
    constructor(scene, x, y, width, height, config) {
        if (config === undefined) {
            config = {};
        }
        super(scene, x, y, width, height);
        this.type = 'rexGridTable';
        this._tableOX = 0;
        this._tableOY = 0;
        this.visibleCells = new Set();
        this.preVisibleCells = new Set();
        this.execeedTopState = false;
        this.execeedBottomState = false;
        this.execeedLeftState = false;
        this.execeedRightState = false;

        var reuseCellContainer = GetValue(config, 'reuseCellContainer', false);
        if (reuseCellContainer) {
            this.cellContainersPool = new Group(scene); // Don't add Group into update list, I will destroy it manually
        }

        var callback = GetValue(config, 'cellVisibleCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'cellVisibleCallbackScope', undefined);
            this.on('cellvisible', callback, scope);
        }
        callback = GetValue(config, 'cellInvisibleCallback', null);
        if (callback !== null) {
            var scope = GetValue(config, 'cellInvisibleCallbackScope', undefined);
            this.on('cellinvisible', callback, scope);
        }

        if (GetValue(config, 'enableLayer', false)) {
            this.enableLayer();
        }

        this.setupChildrenMask(GetValue(config, 'mask', undefined));

        this.setScrollMode(GetValue(config, 'scrollMode', 0));
        this.setClampMode(GetValue(config, 'clamplTableOXY', true));

        // Pre-process cell size
        var cellWidth, cellHeight, columns;
        var scrollY = (this.scrollMode === 0);
        if (scrollY) {  // scroll y
            cellWidth = config.cellWidth;
            cellHeight = config.cellHeight;
            columns = config.columns;
        } else {  // scroll x
            cellWidth = config.cellHeight;
            cellHeight = config.cellWidth;
            columns = GetValue(config, 'rows', config.columns);
        }
        if (!columns) {
            columns = 1;  // Default columns
        }
        this.expandCellSize = (cellWidth === undefined);
        if (this.expandCellSize) {
            var width = (scrollY) ? this.width : this.height;
            cellWidth = width / columns;
        }

        config.cellWidth = cellWidth;
        config.cellHeight = cellHeight;
        config.columns = columns;

        this.table = new Table(this, config);

        this.updateTable();
    }

    destroy(fromScene) {  // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.destroyChildrenMask();

        this.table.destroy(fromScene);
        this.table = undefined;
        if (this.cellContainersPool) {
            this.cellContainersPool.destroy(true);
            this.cellContainersPool = undefined;
        }

        super.destroy(fromScene);
    }

    setScrollMode(mode) {
        if (typeof (mode) === 'string') {
            mode = SCROLLMODE[mode.toLowerCase()];
        }
        this.scrollMode = mode;
        return this;
    }

    setClampMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.clampTableOXY = mode;
        return this;
    }

    get tableOY() {
        return this._tableOY;
    }

    get tableOX() {
        return this._tableOX;
    }

    set tableOY(oy) {
        this.setTableOY(oy).updateTable();
    }

    set tableOX(ox) {
        this.setTableOX(ox).updateTable();
    }

    setTableOXY(ox, oy) {
        this.setTableOY(oy).setTableOX(ox);
        return this;
    }

    addTableOY(dy) {
        this.setTableOY(this.tableOY + dy);
        return this;
    }

    addTableOX(dx) {
        this.setTableOX(this.tableOX + dx);
        return this;
    }

    addTableOXY(dx, dy) {
        this.addTableOY(dy).addTableOX(dx);
        return this;
    }

    setTableOYByPercentage(percentage) {
        this.setTableOY(-this.tableVisibleHeight * percentage);
        return this;
    }

    getTableOYPercentage() {
        var tableVisibleHeight = this.tableVisibleHeight;
        if (tableVisibleHeight === 0) {
            return 0;
        }
        return (this.tableOY / -tableVisibleHeight);
    }

    set t(value) {
        this.setTableOYByPercentage(value).updateTable();
    }

    get t() {
        return this.getTableOYPercentage();
    }

    scrollToBottom() {
        this.t = 1;
        // t will be 0 if table does not exceed visible area
        if (this.t === 0) {
            return this;
        }

        // Table height might be expanded while cells are visible        
        do {
            this.t = 1;
        } while (this.t !== 1)

        return this;
    }

    scrollToRow(rowIndex) {
        // To get all height of cells
        this.scrollToBottom();

        var height = this.table.rowIndexToHeight(0, rowIndex - 1)
        this.setTableOY(-height).updateTable();
        return this;
    }

    scrollToNextRow(rowCount) {
        if (rowCount === undefined) {
            rowCount = 1;
        }
        this.scrollToRow(this.startRowIndex + rowCount);
        return this;
    }

    getCell(cellIdx) {
        return this.table.getCell(cellIdx, true);
    }

    getCellContainer(cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        var container;
        if (cell) {
            container = cell.getContainer();
        }
        return container;
    }

    get cellsCount() {
        return this.table.cellsCount;
    }

    get columnCount() {
        return this.table.colCount;
    }

    setCellHeight(cellIdx, height) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.height = height; // Only worked when scrollMode is 0
        return this;
    }

    setCellWidth(cellIdx, width) {
        var cell;
        if (typeof (cellIdx) === 'number') {
            cell = this.table.getCell(cellIdx, true);
        } else {
            cell = cellIdx;
        }
        cell.width = width; // Only worked when scrollMode is 1
        return this;
    }

    get instHeight() {
        return (this.scrollMode === 0) ? this.height : this.width;
    }

    get instWidth() {
        return (this.scrollMode === 0) ? this.width : this.height;
    }

    get tableHeight() {
        return this.table.totalRowsHeight;
    }

    get tableWidth() {
        return this.table.totalColumnWidth;
    }

    get topTableOY() {
        return 0;
    }

    get bottomTableOY() {
        return -this.tableVisibleHeight;
    }

    get leftTableOX() {
        return 0;
    }

    get rightTableOX() {
        return -this.tableVisibleWidth;
    }

    get tableVisibleHeight() {
        var h = this.tableHeight - this.instHeight;
        if (h < 0) {
            h = 0;
        }
        return h;
    }

    get tableVisibleWidth() {
        var w;
        var tableWidth = this.tableWidth;
        var instWidth = this.instWidth;
        if (tableWidth > instWidth) {
            w = tableWidth - instWidth;
        } else {
            w = 0;
        }
        return w;
    };

    get bottomLeftY() {
        return -(this.displayHeight * this.originY) + this.displayHeight;
    }

    get topRightX() {
        return -(this.displayWidth * this.originX) + this.displayWidth;
    }

    get topLeftX() {
        return -(this.displayWidth * this.originX);
    }

    get topLeftY() {
        return -(this.displayHeight * this.originY)
    }

    get bottomBound() {
        if (this.scrollMode === 0) {
            return this.bottomLeftY;
        } else {
            return this.topRightX;
        }
    }

    get rightBound() {
        if (this.scrollMode === 0) {
            return this.topRightX;
        } else {
            return this.bottomLeftY;
        }
    }

    resize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.resize(width, height);

        if (this.expandCellSize) {
            this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
        }
        this.updateTable(true);

        // Layout children-mask
        this.layoutChildrenMask();
        // Re-mask children
        this.maskChildren();

        return this;
    }
};

// mixin
Object.assign(
    GridTable.prototype,
    Methods
);

const SCROLLMODE = {
    v: 0,
    vertical: 0,
    h: 1,
    horizontal: 1
};

const MASKUPDATEMODE = {
    update: 0,
    everyTick: 1
};

export default GridTable;