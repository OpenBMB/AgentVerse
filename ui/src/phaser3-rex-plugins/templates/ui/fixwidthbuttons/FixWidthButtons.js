import FixWidthSizer from '../fixwidthsizer/FixWidthSizer.js';
import AddChildMethods from './AddChildMethods.js';
import RemoveChildMethods from './RemoveChildMethods.js';
import ButtonGroup from '../utils/buttongroup/ButtonGroup.js';
import ButtonMethods from '../utils/buttongroup/ButtonMethods.js';
import ButtonStateMethods from '../utils/buttongroup/ButtonStateMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Buttons extends FixWidthSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var buttonSpace = config.space;
        if (typeof (buttonSpace) === 'number') {
            config.space = { item: buttonSpace, line: buttonSpace };
        }

        // Create
        super(scene, config);
        this.type = 'rexFixWidthButtons';
        this.buttonGroup = new ButtonGroup({
            parent: this,
            eventEmitter: GetValue(config, 'eventEmitter', this),
            groupName: GetValue(config, 'groupName', undefined),
            clickConfig: GetValue(config, 'click', undefined)
        })
            .setButtonsType(config);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var buttons = GetValue(config, 'buttons', undefined);

        // Buttons properties
        this.buttonsAlign = GetValue(config, 'align', undefined);

        if (background) {
            this.addBackground(background);
        }

        if (buttons) {
            this.addButtons(buttons);
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
    Buttons.prototype,
    AddChildMethods,
    RemoveChildMethods,
    ButtonMethods,
    ButtonStateMethods
);

export default Buttons;