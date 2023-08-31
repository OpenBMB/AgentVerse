import PathFollower from './pathfollower.js';

class PathFollowerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new PathFollower(gameObject, config);
    }

}

export default PathFollowerPlugin;