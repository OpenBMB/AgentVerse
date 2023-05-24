import Scrollable from '../utils/scrollable/Scrollable.js';
import GetScrollMode from '../utils/GetScrollMode.js';
import GridTableCore from '../../../plugins/gridtable.js';
import InjectProperties from './InjectProperties.js';
import TableOnCellVisible from './TableOnCellVisible.js';
import TableSetInteractive from './input/TableSetInteractive.js';
import NOOP from '../../../plugins/utils/object/NOOP.js';
import SetItems from './SetItems.js';
import ScrollMethods from './ScrollMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create grid table core
        var scrollMode = GetScrollMode(config);
        var tableConfig = GetValue(config, 'table', undefined)
        if (tableConfig === undefined) {
            tableConfig = {};
        }
        tableConfig.scrollMode = scrollMode;
        tableConfig.clamplTableOXY = GetValue(config, 'clamplChildOY', false);
        var tableWidth = GetValue(tableConfig, 'width', undefined);
        var tableHeight = GetValue(tableConfig, 'height', undefined);
        var table = new GridTableCore(scene, 0, 0, tableWidth, tableHeight, tableConfig);
        scene.add.existing(table); // Important: Add to display list for touch detecting
        var proportion, expand;
        if (scrollMode === 0) {
            proportion = (tableWidth === undefined) ? 1 : 0;
            expand = (tableHeight === undefined);
        } else {
            proportion = (tableHeight === undefined) ? 1 : 0;
            expand = (tableWidth === undefined);
        }
        // Inject properties for scrollable interface
        InjectProperties(table);
        // Set minWidth/minHeight to 0 if tableWidth/tableHeight is undefined
        table._minWidth = (tableWidth === undefined) ? 0 : undefined;
        table._minHeight = (tableHeight === undefined) ? 0 : undefined;

        // Fill config of scrollable
        config.type = 'rexGridTable';
        config.child = {
            gameObject: table,
            proportion: proportion,
            expand: expand,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = spaceConfig.table;
        }
        super(scene, config);

        this.addChildrenMap('table', table);
        this.addChildrenMap('tableLayer', table.maskLayer);

        this.eventEmitter = GetValue(config, 'eventEmitter', this);
        var callback = GetValue(config, 'createCellContainerCallback', NOOP);
        var scope = GetValue(config, 'createCellContainerCallbackScope', undefined);
        this.setCreateCellContainerCallback(callback, scope);
        TableOnCellVisible.call(this, table);

        this.resizeControllerFlag = false;
        var eventName = (scrollMode === 0) ? 'cellheightchange' : 'cellwidthchange';
        table.on(eventName, function () {
            this.resizeControllerFlag = true;
        }, this);

        if (GetValue(tableConfig, 'interactive', true)) {
            TableSetInteractive.call(this, table, tableConfig);
        }
        this.setItems(GetValue(config, 'items', []));

        scene.game.events.on('poststep', this.onPostStep, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.scene.game.events.off('poststep', this.onPostStep, this);

        super.destroy(fromScene);
    }

    setCreateCellContainerCallback(callback, scope) {
        this.createCellContainerCallback = callback;
        this.createCellContainerCallbackScope = scope;
        return this;
    }

    refresh() {
        this.setItems(this.items);
        return this;
    }

    getCell(cellIdx) {
        var table = this.childrenMap.child;
        return table.getCell(cellIdx);
    }

    getCellContainer(cellIdx) {
        var table = this.childrenMap.child;
        return table.getCellContainer(cellIdx);
    }

    updateVisibleCell(cellIdx) {
        var table = this.childrenMap.child;
        return table.updateVisibleCell(cellIdx);
    }

    onPostStep() {
        if (this.resizeControllerFlag) {
            this.resizeController();
            this.resizeControllerFlag = false;
        }
    }

    get startRowIndex() {
        var table = this.childrenMap.child;
        return table.startRowIndex;
    }
}

var methods = {
    setItems: SetItems
}
Object.assign(
    GridTable.prototype,
    ScrollMethods,
    methods,
);

export default GridTable;