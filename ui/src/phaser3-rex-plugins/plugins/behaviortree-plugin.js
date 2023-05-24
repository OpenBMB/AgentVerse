import ObjectFactory from './logic/behaviortree/ObjectFactory.js';
import Factory from './logic/behaviortree/Factory.js';

class BehaviorTreePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        this.add = new ObjectFactory();
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

export default BehaviorTreePlugin;