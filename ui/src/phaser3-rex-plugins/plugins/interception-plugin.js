import Interception from './interception.js';

class InterceptionPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(gameObject, config) {
        return new Interception(gameObject, config);
    }
}
export default InterceptionPlugin;