import WaitEvents from './waitevents.js';

class WaitEventsPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(completeCallback, scope) {
        return new WaitEvents(completeCallback, scope);
    }

}

export default WaitEventsPlugin;