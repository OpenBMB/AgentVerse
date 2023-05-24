class MaxDeltaPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        eventEmitter.on('step', this.update, this);
    }

    destroy() {
        this.game.events.off('step', this.update, this);
        super.destroy();
    }

    reset() {
        this.prevTime = undefined;
        this.maxDelta = undefined;
    }

    update(time, delta) {
        if (this.prevTime === undefined) {
            this.prevTime = time;
            this.maxDelta = 0;
        } else {
            var dt = time - this.prevTime;
            this.prevTime = time;
            if (this.maxDelta < dt) {
                this.maxDelta = dt;
                console.log(`Max delta: ${dt}`);
            }
        }
    }
}

export default MaxDeltaPlugin;