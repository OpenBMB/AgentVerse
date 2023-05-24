import BuildFuzzyModule from './fuzzy';

class FuzzyPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return BuildFuzzyModule(config);
    }

}

export default FuzzyPlugin;