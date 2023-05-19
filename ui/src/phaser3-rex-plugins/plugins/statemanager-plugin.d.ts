import StateManager from './statemanager.js';

export default class StateManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        config?: StateManager.IConfig
    ): StateManager;

}