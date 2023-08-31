import Achievements from './ymlachievements.js'

class AchievementsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new Achievements();
    }
}

export default AchievementsPlugin;