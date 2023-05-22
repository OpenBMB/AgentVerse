import TickTask from './TickTask.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SceneUpdateTickTask extends TickTask {
    constructor(parent, config) {
        super(parent, config);

        // scene update : update, preupdate, postupdate, prerender, render
        // game update : step, poststep, 

        // If this.scene is not available, use game's 'step' event
        var defaultEventName = (this.scene) ? 'update' : 'step';
        this.tickEventName = GetValue(config, 'tickEventName', defaultEventName);
        this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

    }

    startTicking() {
        super.startTicking();

        if (this.isSceneTicker) {
            this.scene.sys.events.on(this.tickEventName, this.update, this);
        } else {
            this.game.events.on(this.tickEventName, this.update, this);
        }

    }

    stopTicking() {
        super.stopTicking();

        if (this.isSceneTicker && this.scene) { // Scene might be destoryed
            this.scene.sys.events.off(this.tickEventName, this.update, this);
        } else if (this.game) {
            this.game.events.off(this.tickEventName, this.update, this);
        }
    }

    // update(time, delta) {
    //     
    // }

}

var IsGameUpdateEvent = function (eventName) {
    return (eventName === 'step') || (eventName === 'poststep');
}

export default SceneUpdateTickTask;