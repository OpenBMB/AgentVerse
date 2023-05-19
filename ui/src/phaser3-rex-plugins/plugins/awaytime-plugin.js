import AwayTime from './awaytime.js'

class AwayTimePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        if (this._defaultAwayTimer) {
            this._defaultAwayTimer.destroy();
        }
        super.destroy();
    }

    add(config) {
        return new AwayTime(config);
    }

    get defaultAwayTimer() {
        if (!this._defaultAwayTimer) {
            this._defaultAwayTimer = this.add();
        }
        return this._defaultAwayTimer;
    }

    get awayTime() {
        return this.defaultAwayTimer.awayTime;
    }

    setKey(key) {
        this.defaultAwayTimer.setKey(key);
        return this;
    }

    setPeriod(time) {
        this.defaultAwayTimer.setPeriod(time);
        return this;
    }
}

export default AwayTimePlugin;