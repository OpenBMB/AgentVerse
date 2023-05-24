import Factory from './gameobjects/shape/checkbox/Factory.js';
import Creator from './gameobjects/shape/checkbox/Creator.js';
import Checkbox from './gameobjects/shape/checkbox/Checkbox.js';
import CheckboxShapeFactory from './gameobjects/shape/checkbox/CheckboxShapeFactory.js';
import CheckboxShapeCreator from './gameobjects/shape/checkbox/CheckboxShapeCreator.js';
import CheckboxShape from './gameobjects/shape/checkbox/CheckboxShape.js';
import SetValue from './utils/object/SetValue.js';

class CheckboxPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexCheckbox', Factory, Creator);
        pluginManager.registerGameObject('rexCheckboxShape', CheckboxShapeFactory, CheckboxShapeCreator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.Checkbox', Checkbox);
SetValue(window, 'RexPlugins.GameObjects.CheckboxShape', CheckboxShape);

export default CheckboxPlugin;