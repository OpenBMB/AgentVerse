import DataManager from './restorabledata';

export default class DataManagerPlugin extends Phaser.Plugins.BasePlugin {
    add(
        parent: object,
        eventEmitter?: Phaser.Events.EventEmitter,
        config?: object
    ): DataManager;

}