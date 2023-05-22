import RunCommands from './runcommands.js';

class RunCommandsPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    run(queue, scope, config) {
        return RunCommands(queue, scope, config);
    }
}

export default RunCommandsPlugin;