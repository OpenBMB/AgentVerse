import Factory from './gameobjects/container/containerlite/Factory.js';
import Creator from './gameobjects/container/containerlite/Creator.js';
import ContainerLite from './gameobjects/container/containerlite/ContainerLite.js';
import SetValue from './utils/object/SetValue.js';

class ContainerLitePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexContainerLite', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    getParent(child) {
        return ContainerLite.GetParent(child);
    }
}

SetValue(window, 'RexPlugins.GameObjects.ContainerLite', ContainerLite);

export default ContainerLitePlugin;