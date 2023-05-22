import GridSizer from '../gridsizer/GridSizer.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ButtonGroup from '../utils/buttongroup/ButtonGroup.js';
import ButtonMethods from '../utils/buttongroup/ButtonMethods.js';
import ButtonStateMethods from '../utils/buttongroup/ButtonStateMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridButtons extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        var rowCount = GetValue(config, 'row', 0);
        var columnCount = GetValue(config, 'column', (config.col || 0));
        var createCellContainerCallback = GetValue(config, 'createCellContainerCallback');
        var buttons = GetValue(config, 'buttons', undefined);
        var buttonsExpand = GetValue(config, 'expand', true);
        var buttonProportion = (buttonsExpand) ? 1 : 0;

        if (createCellContainerCallback) {
            config.createCellContainerCallback = undefined;
        }
        if (buttons !== undefined) {
            rowCount = Math.max(rowCount, buttons.length);
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                columnCount = Math.max(columnCount, buttons[i].length);
            }
        }

        config.row = rowCount;
        config.column = columnCount;
        config.columnProportions = buttonProportion;
        config.rowProportions = buttonProportion;

        // Create
        super(scene, config);
        this.type = 'rexGridButtons';
        this.buttonGroup = new ButtonGroup({
            parent: this,
            eventEmitter: GetValue(config, 'eventEmitter', this),
            groupName: GetValue(config, 'groupName', undefined),
            clickConfig: GetValue(config, 'click', undefined)
        })
            .setButtonsType(config);

        // Add elements
        var background = GetValue(config, 'background', undefined);

        // Buttons properties
        this.buttonsExpand = buttonsExpand;
        var space = GetValue(config, 'space', undefined);
        if (typeof (space) === 'number') {
            space = { itemX: space, itemY: space };
        }

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            var rowButtons, button;
            for (var r = 0, rcnt = buttons.length; r < rcnt; r++) { // row
                rowButtons = buttons[r];
                for (var c = 0, ccnt = rowButtons.length; c < ccnt; c++) { // col
                    button = rowButtons[c];
                    if (button) {
                        this.addButton(button, c, r);
                    }
                }
            }
        } else if (createCellContainerCallback) {
            for (var y = 0; y < rowCount; y++) {
                for (var x = 0; x < columnCount; x++) {
                    var button = createCellContainerCallback(scene, x, y);
                    if (button) {
                        this.addButton(button, x, y);
                    }
                }
            }
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('buttons', this.buttonGroup.buttons);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);
        this.buttonGroup.destroy();
        this.buttonGroup = undefined;
    }

    get buttons() {
        return this.buttonGroup.buttons;
    }

    get groupName() {
        return this.buttonGroup.groupName;
    }

    set groupName(value) {
        this.buttonGroup.groupName = value;
    }

    get eventEmitter() {
        return this.buttonGroup.eventEmitter;
    }
}

Object.assign(
    GridButtons.prototype,
    AddChildMethods,
    RemoveChildMethods,
    ButtonMethods,
    ButtonStateMethods
);

export default GridButtons;