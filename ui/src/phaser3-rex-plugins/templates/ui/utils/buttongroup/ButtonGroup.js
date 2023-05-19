import AddMethods from './AddMethods.js';
import RemoveMethods from './RemoveMethods.js';
import FireEvent from './FireEvent.js';
import ButtonsTypeMethods from './ButtonsTypeMethods.js';
import ButtonMethods from './ButtonMethods.js';

class ButtonGroup {
    constructor(config) {
        this.parent = config.parent;
        this.eventEmitter = config.eventEmitter;
        this.groupName = config.groupName;
        this.clickConfig = config.clickConfig;

        this.buttonsType = undefined;
        this.buttons = [];
    }

    destroy() {
        this.parent = undefined;
        this.eventEmitter = undefined;
        this.clickConfig = undefined;
        this.buttons = undefined; // GameObjects will be destroyed outside
    }
}

var methods = {
    fireEvent: FireEvent
}

Object.assign(
    ButtonGroup.prototype,
    AddMethods,
    RemoveMethods,
    ButtonsTypeMethods,
    ButtonMethods,
    methods
);


export default ButtonGroup;