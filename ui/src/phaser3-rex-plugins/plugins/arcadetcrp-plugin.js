import TCRP from './arcadetcrp.js';

const Recorder = TCRP.Recorder;
const Player = TCRP.Player;
const StepRunner = TCRP.StepRunner;

class ArcadeTCRPPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    addRecorder(parent, config) {
        return new Recorder(parent, config);
    }

    addPlayer(parent, config) {
        return new Player(parent, config);
    }

    addStepRunner(parent) {
        return new StepRunner(parent);
    }
}

var methods = {
    runCommands: TCRP.RunCommands
}

Object.assign(
    ArcadeTCRPPlugin.prototype,
    methods
);

export default ArcadeTCRPPlugin;